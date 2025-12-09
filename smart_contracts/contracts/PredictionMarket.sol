

contract PredictionMarket {
    
    struct Market {
        string question;
        string description;
        uint256 endTime;
        bool resolved;
        uint8 winningOutcome; // 0 = NO, 1 = YES
        uint256 totalLiquidity;
        uint256 outcomeAShares;
        uint256 outcomeBShares;
        uint256 yesPool;
        uint256 noPool;
        address creator;
    }

    struct Bet {
        uint256 amount;
        uint8 outcome; // 0 = NO, 1 = YES
        bool claimed;
    }

    // =====================
    // ===== STATE ========
    // =====================
    address public admin;
    uint256 public nextMarketId;

    mapping(uint256 => Market) public markets;
    mapping(uint256 => mapping(address => Bet)) public bets; // marketId => user => Bet

    // =====================
    // ===== EVENTS =======
    // =====================
    event MarketCreated(
        uint256 indexed marketId,
        string question,
        uint256 endTime,
        address indexed creator
    );

    event BetPlaced(
        uint256 indexed marketId,
        address indexed user,
        uint8 outcome,
        uint256 amount
    );

    event MarketResolved(
        uint256 indexed marketId,
        uint8 winningOutcome
    );

    event PayoutClaimed(
        uint256 indexed marketId,
        address indexed user,
        uint256 payout
    );

    // =====================
    // ===== MODIFIERS =====
    // =====================
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier marketExists(uint256 marketId) {
        require(marketId < nextMarketId, "Market does not exist");
        _;
    }

    modifier beforeEnd(uint256 marketId) {
        require(block.timestamp < markets[marketId].endTime, "Market has ended");
        _;
    }

    // =====================
    // ===== CONSTRUCTOR ===
    // =====================
    constructor() {
        admin = msg.sender;
        nextMarketId = 0;
    }

    // =====================
    // ===== FUNCTIONS =====
    // =====================

    /**
     * @notice Admin creates a new market
     */
    function createMarket(
        string memory question,
        string memory description,
        uint256 endTime
    ) external onlyAdmin {
        require(endTime > block.timestamp, "End time must be in the future");

        Market storage market = markets[nextMarketId];
        market.question = question;
        market.description = description;
        market.endTime = endTime;
        market.creator = msg.sender;

        emit MarketCreated(nextMarketId, question, endTime, msg.sender);
        nextMarketId++;
    }

    /**
     * @notice User places a bet (YES or NO)
     * outcome = 0 => NO, 1 => YES
     */
    function placeBet(uint256 marketId, uint8 outcome)
        external
        payable
        marketExists(marketId)
        beforeEnd(marketId)
    {
        require(outcome == 0 || outcome == 1, "Invalid outcome");
        require(msg.value > 0, "Must send ETH to place a bet");
        require(bets[marketId][msg.sender].amount == 0, "Bet already placed");

        Market storage market = markets[marketId];
        Bet storage userBet = bets[marketId][msg.sender];

        userBet.amount = msg.value;
        userBet.outcome = outcome;
        userBet.claimed = false;

        // Update liquidity pools
        if (outcome == 1) {
            market.yesPool += msg.value;
            market.outcomeBShares += msg.value;
        } else {
            market.noPool += msg.value;
            market.outcomeAShares += msg.value;
        }
        market.totalLiquidity += msg.value;

        emit BetPlaced(marketId, msg.sender, outcome, msg.value);
    }

    /**
     * @notice Admin resolves a market
     * @dev Later replace this with oracle call
     */
    function resolveMarket(uint256 marketId, uint8 winningOutcome)
        external
        onlyAdmin
        marketExists(marketId)
    {
        Market storage market = markets[marketId];
        require(block.timestamp >= market.endTime, "Market not ended");
        require(!market.resolved, "Already resolved");
        require(winningOutcome == 0 || winningOutcome == 1, "Invalid outcome");

        market.resolved = true;
        market.winningOutcome = winningOutcome;

        emit MarketResolved(marketId, winningOutcome);
    }

    /**
     * @notice User claims their payout after resolution
     */
    function claimPayout(uint256 marketId)
        external
        marketExists(marketId)
    {
        Market storage market = markets[marketId];
        Bet storage userBet = bets[marketId][msg.sender];

        require(market.resolved, "Market not resolved yet");
        require(!userBet.claimed, "Already claimed");
        require(userBet.amount > 0, "No bet found");

        uint256 payout = 0;

        if (userBet.outcome == market.winningOutcome) {
            uint256 winnerPool = market.winningOutcome == 1 ? market.yesPool : market.noPool;
            uint256 loserPool = market.winningOutcome == 1 ? market.noPool : market.yesPool;

            payout = userBet.amount + (loserPool * userBet.amount) / winnerPool;
        }

        userBet.claimed = true;
        if (payout > 0) {
            payable(msg.sender).transfer(payout);
        }

        emit PayoutClaimed(marketId, msg.sender, payout);
    }

    /**
     * @notice View function to get market details
     */
    function getMarket(uint256 marketId)
        external
        view
        returns (
            string memory question,
            string memory description,
            bool resolved,
            uint8 winningOutcome,
            uint256 yesPool,
            uint256 noPool,
            uint256 endTime
        )
    {
        Market storage m = markets[marketId];
        return (m.question, m.description, m.resolved, m.winningOutcome, m.yesPool, m.noPool, m.endTime);
    }
}