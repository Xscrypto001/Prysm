// src/pages/CreateMarket.jsx
import React, { useState } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Chip,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Add,
  Remove,
  AttachMoney,
  Schedule,
  Tag,
  TrendingUp,
  Description,
  Save,
  Clear,
  Visibility,
  Category,
  Timeline,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const CreateMarket = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [marketData, setMarketData] = useState({
    title: '',
    description: '',
    category: '',
    outcomes: ['Yes', 'No'],
    newOutcome: '',
    resolutionDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    liquidity: 1000,
    tradingFee: 1.0,
    tags: [],
    newTag: '',
  });

  const categories = [
    'Crypto & Blockchain',
    'Stocks & Finance',
    'Sports',
    'Politics',
    'Technology',
    'Entertainment',
    'Science',
    'Weather',
    'Other',
  ];

  const addOutcome = () => {
    if (marketData.newOutcome.trim() && !marketData.outcomes.includes(marketData.newOutcome.trim())) {
      setMarketData({
        ...marketData,
        outcomes: [...marketData.outcomes, marketData.newOutcome.trim()],
        newOutcome: '',
      });
    }
  };

  const removeOutcome = (index) => {
    const newOutcomes = [...marketData.outcomes];
    newOutcomes.splice(index, 1);
    setMarketData({ ...marketData, outcomes: newOutcomes });
  };

  const addTag = () => {
    if (marketData.newTag.trim() && !marketData.tags.includes(marketData.newTag.trim())) {
      setMarketData({
        ...marketData,
        tags: [...marketData.tags, marketData.newTag.trim()],
        newTag: '',
      });
    }
  };

  const removeTag = (index) => {
    const newTags = [...marketData.tags];
    newTags.splice(index, 1);
    setMarketData({ ...marketData, tags: newTags });
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 2000);
  };

  const steps = [
    { number: 1, title: 'Market Details', icon: <Description /> },
    { number: 2, title: 'Outcomes & Rules', icon: <TrendingUp /> },
    { number: 3, title: 'Funding & Fees', icon: <AttachMoney /> },
    { number: 4, title: 'Review & Create', icon: <Save /> },
  ];

  const StepIndicator = () => (
    <Box sx={{ mb: 6 }}>
      <Grid container spacing={2}>
        {steps.map((s) => (
          <Grid item xs={12} sm={3} key={s.number}>
            <Card
              onClick={() => setStep(s.number)}
              sx={{
                cursor: 'pointer',
                background: step === s.number 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'rgba(30, 30, 46, 0.5)',
                border: step === s.number ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 32px rgba(124, 58, 237, 0.2)',
                }
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: step === s.number ? 'white' : 'rgba(124, 58, 237, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: step === s.number ? '#7c3aed' : 'white',
                      fontSize: 20,
                      fontWeight: 600,
                    }}
                  >
                    {s.icon}
                  </Box>
                </Box>
                <Typography variant="body2" fontWeight={600} color={step === s.number ? 'white' : 'text.secondary'}>
                  Step {s.number}
                </Typography>
                <Typography variant="body1" fontWeight={600} color={step === s.number ? 'white' : 'white'}>
                  {s.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography
              variant="h2"
              sx={{
                mb: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
              }}
            >
              Create Prediction Market
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Set up a new market for others to trade on
            </Typography>
          </Box>

          <StepIndicator />

          <Paper
            sx={{
              p: { xs: 3, md: 5 },
              background: 'linear-gradient(145deg, #1E1E2E 0%, #2D2B42 100%)',
              border: '1px solid rgba(124, 58, 237, 0.1)',
              borderRadius: 3,
              backdropFilter: 'blur(20px)',
            }}
          >
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
                  Market Information
                </Typography>
                
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Market Question"
                      placeholder="e.g., Will Bitcoin reach $100,000 by end of 2024?"
                      value={marketData.title}
                      onChange={(e) => setMarketData({ ...marketData, title: e.target.value })}
                      InputProps={{
                        sx: {
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      placeholder="Provide detailed context about the market..."
                      multiline
                      rows={4}
                      value={marketData.description}
                      onChange={(e) => setMarketData({ ...marketData, description: e.target.value })}
                      InputProps={{
                        sx: {
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Category</InputLabel>
                      <Select
                        value={marketData.category}
                        label="Category"
                        onChange={(e) => setMarketData({ ...marketData, category: e.target.value })}
                        sx={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: 2,
                        }}
                      >
                        {categories.map((cat) => (
                          <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <TextField
                        fullWidth
                        label="Add Tag"
                        value={marketData.newTag}
                        onChange={(e) => setMarketData({ ...marketData, newTag: e.target.value })}
                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
                        InputProps={{
                          sx: {
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: 2,
                          }
                        }}
                      />
                      <Button
                        variant="contained"
                        onClick={addTag}
                        startIcon={<Add />}
                        sx={{ minWidth: 'auto', px: 3 }}
                      >
                        Add
                      </Button>
                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {marketData.tags.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          onDelete={() => removeTag(index)}
                          deleteIcon={<Remove />}
                          sx={{
                            background: 'rgba(124, 58, 237, 0.1)',
                            color: '#7c3aed',
                          }}
                        />
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
                  Market Outcomes
                </Typography>
                
                <Alert severity="info" sx={{ mb: 4, background: 'rgba(59, 130, 246, 0.1)' }}>
                  Define the possible outcomes for this market. Each outcome will be represented as a tradable token.
                </Alert>

                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                      Current Outcomes
                    </Typography>
                    <Grid container spacing={2}>
                      {marketData.outcomes.map((outcome, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <Card
                            sx={{
                              background: 'rgba(124, 58, 237, 0.1)',
                              border: '1px solid rgba(124, 58, 237, 0.3)',
                              borderRadius: 2,
                            }}
                          >
                            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <Typography variant="body1" fontWeight={600}>
                                {outcome}
                              </Typography>
                              {marketData.outcomes.length > 2 && (
                                <IconButton
                                  size="small"
                                  onClick={() => removeOutcome(index)}
                                  sx={{ color: '#ef4444' }}
                                >
                                  <Remove />
                                </IconButton>
                              )}
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <TextField
                        fullWidth
                        label="Add New Outcome"
                        value={marketData.newOutcome}
                        onChange={(e) => setMarketData({ ...marketData, newOutcome: e.target.value })}
                        onKeyPress={(e) => e.key === 'Enter' && addOutcome()}
                        InputProps={{
                          sx: {
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: 2,
                          }
                        }}
                      />
                      <Button
                        variant="contained"
                        onClick={addOutcome}
                        startIcon={<Add />}
                        sx={{ minWidth: 'auto', px: 3 }}
                      >
                        Add
                      </Button>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={{ mt: 4 }}>
                      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                        Resolution Date & Time
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <DatePicker
                            label="Resolution Date"
                            value={marketData.resolutionDate}
                            onChange={(date) => setMarketData({ ...marketData, resolutionDate: date })}
                            slotProps={{
                              textField: {
                                fullWidth: true,
                                sx: {
                                  background: 'rgba(255, 255, 255, 0.05)',
                                  borderRadius: 2,
                                }
                              }
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TimePicker
                            label="Resolution Time"
                            value={marketData.resolutionDate}
                            onChange={(date) => setMarketData({ ...marketData, resolutionDate: date })}
                            slotProps={{
                              textField: {
                                fullWidth: true,
                                sx: {
                                  background: 'rgba(255, 255, 255, 0.05)',
                                  borderRadius: 2,
                                }
                              }
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
                  Funding & Fees
                </Typography>

                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Card
                      sx={{
                        background: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        borderRadius: 2,
                        height: '100%',
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <AttachMoney sx={{ mr: 1, color: '#10b981' }} />
                          <Typography variant="h6" fontWeight={600}>
                            Initial Liquidity
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                          Provide initial liquidity to bootstrap the market. Higher liquidity attracts more traders.
                        </Typography>
                        
                        <Box sx={{ px: 2 }}>
                          <Slider
                            value={marketData.liquidity}
                            onChange={(e, value) => setMarketData({ ...marketData, liquidity: value })}
                            min={100}
                            max={10000}
                            step={100}
                            valueLabelDisplay="auto"
                            valueLabelFormat={(value) => `$${value}`}
                            sx={{
                              color: '#10b981',
                              '& .MuiSlider-thumb': {
                                background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                              }
                            }}
                          />
                          <Typography variant="h4" sx={{ textAlign: 'center', mt: 2, fontWeight: 700 }}>
                            ${marketData.liquidity.toLocaleString()}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Card
                      sx={{
                        background: 'rgba(124, 58, 237, 0.1)',
                        border: '1px solid rgba(124, 58, 237, 0.3)',
                        borderRadius: 2,
                        height: '100%',
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Timeline sx={{ mr: 1, color: '#7c3aed' }} />
                          <Typography variant="h6" fontWeight={600}>
                            Trading Fee
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                          Set the fee percentage charged on each trade. Lower fees attract more volume.
                        </Typography>
                        
                        <Box sx={{ px: 2 }}>
                          <Slider
                            value={marketData.tradingFee}
                            onChange={(e, value) => setMarketData({ ...marketData, tradingFee: value })}
                            min={0.1}
                            max={5}
                            step={0.1}
                            valueLabelDisplay="auto"
                            valueLabelFormat={(value) => `${value}%`}
                            sx={{
                              color: '#7c3aed',
                              '& .MuiSlider-thumb': {
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              }
                            }}
                          />
                          <Typography variant="h4" sx={{ textAlign: 'center', mt: 2, fontWeight: 700 }}>
                            {marketData.tradingFee}%
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12}>
                    <Alert severity="warning" sx={{ background: 'rgba(245, 158, 11, 0.1)' }}>
                      <Typography variant="body2" fontWeight={600}>
                        💡 Pro Tip: Start with $1,000-$2,000 liquidity and 1-2% fees for optimal market growth.
                      </Typography>
                    </Alert>
                  </Grid>
                </Grid>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
                  Review & Create
                </Typography>

                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Card
                      sx={{
                        background: 'rgba(30, 30, 46, 0.5)',
                        border: '1px solid rgba(124, 58, 237, 0.3)',
                        borderRadius: 2,
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 3, color: '#7c3aed' }}>
                          Market Preview
                        </Typography>
                        
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" color="text.secondary">
                              Question
                            </Typography>
                            <Typography variant="body1" fontWeight={600} sx={{ mb: 2 }}>
                              {marketData.title || 'No title provided'}
                            </Typography>
                          </Grid>
                          
                          <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" color="text.secondary">
                              Category
                            </Typography>
                            <Typography variant="body1" fontWeight={600} sx={{ mb: 2 }}>
                              {marketData.category || 'Not selected'}
                            </Typography>
                          </Grid>

                          <Grid item xs={12}>
                            <Typography variant="subtitle2" color="text.secondary">
                              Description
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                              {marketData.description || 'No description provided'}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" color="text.secondary">
                              Outcomes
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                              {marketData.outcomes.map((outcome, index) => (
                                <Chip
                                  key={index}
                                  label={outcome}
                                  sx={{
                                    background: 'rgba(124, 58, 237, 0.2)',
                                    color: '#7c3aed',
                                    fontWeight: 600,
                                  }}
                                />
                              ))}
                            </Box>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" color="text.secondary">
                              Resolution Time
                            </Typography>
                            <Typography variant="body1" fontWeight={600}>
                              {marketData.resolutionDate.toLocaleString()}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" color="text.secondary">
                              Initial Liquidity
                            </Typography>
                            <Typography variant="h5" color="#10b981" fontWeight={700}>
                              ${marketData.liquidity.toLocaleString()}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" color="text.secondary">
                              Trading Fee
                            </Typography>
                            <Typography variant="h5" color="#7c3aed" fontWeight={700}>
                              {marketData.tradingFee}%
                            </Typography>
                          </Grid>

                          {marketData.tags.length > 0 && (
                            <Grid item xs={12}>
                              <Typography variant="subtitle2" color="text.secondary">
                                Tags
                              </Typography>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                                {marketData.tags.map((tag, index) => (
                                  <Chip
                                    key={index}
                                    label={tag}
                                    size="small"
                                    sx={{
                                      background: 'rgba(255, 255, 255, 0.05)',
                                      color: 'rgba(255, 255, 255, 0.7)',
                                    }}
                                  />
                                ))}
                              </Box>
                            </Grid>
                          )}
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12}>
                    <Alert severity="success" sx={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                      <Typography variant="body2">
                        ✅ Your market will be created on the blockchain. This requires a blockchain transaction and gas fees.
                      </Typography>
                    </Alert>
                  </Grid>
                </Grid>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <Box sx={{ mt: 6, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                onClick={() => step > 1 ? setStep(step - 1) : navigate('/')}
                startIcon={step === 1 ? <Clear /> : undefined}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&:hover': {
                    borderColor: '#ef4444',
                    color: '#ef4444',
                  }
                }}
              >
                {step === 1 ? 'Cancel' : 'Back'}
              </Button>

              <Box sx={{ display: 'flex', gap: 2 }}>
                {step < 4 && (
                  <Button
                    variant="contained"
                    onClick={() => setStep(step + 1)}
                    sx={{
                      px: 4,
                      py: 1.5,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                      }
                    }}
                  >
                    Continue
                  </Button>
                )}
                
                {step === 4 && (
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading || !marketData.title || !marketData.category || marketData.outcomes.length < 2}
                    startIcon={loading ? <CircularProgress size={20} /> : <Save />}
                    sx={{
                      px: 6,
                      py: 1.5,
                      background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                      }
                    }}
                  >
                    {loading ? 'Creating...' : 'Create Market'}
                  </Button>
                )}
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </LocalizationProvider>
  );
};

export default CreateMarket;