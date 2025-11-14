import { useState, useEffect } from 'react';
import { 
  Gavel, 
  Clock, 
  Users, 
  CoinsIcon, 
  TrendingDown, 
  Award, 
  CheckCircle2, 
  Lock 
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/common/Badge';
import { Progress } from '@/components/ui/progress';
import { SectionHeader } from '@/components/common/SectionHeader';
import Layout from '@/components/layout/Layout';

const Auction = () => {
  const { toast } = useToast();
  const [currentPrice, setCurrentPrice] = useState(5000);
  const [remainingSeats, setRemainingSeats] = useState(20);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 1 hour in seconds
  const [stakeAmount, setStakeAmount] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [participants, setParticipants] = useState([
    { id: 1, name: 'Mayo Clinic', region: 'North America', stake: 8500 },
    { id: 2, name: 'NHS University Hospital', region: 'Europe', stake: 7200 },
    { id: 3, name: 'Singapore General', region: 'Asia', stake: 6800 },
    { id: 4, name: 'Berlin Medical Center', region: 'Europe', stake: 6200 },
    { id: 5, name: 'Mohammed Bin Rashid University', region: 'Middle East', stake: 6000 },
    { id: 6, name: 'Toronto Health Network', region: 'North America', stake: 5800 },
  ]);

  // Simulate price dropping over time
  useEffect(() => {
    if (!isJoined && timeRemaining > 0 && currentPrice > 1000) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
        // Drop price gradually
        if (timeRemaining % 60 === 0) {
          setCurrentPrice(prev => Math.max(prev - 100, 1000));
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [timeRemaining, currentPrice, isJoined]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleJoinSubnet = () => {
    if (!stakeAmount || parseInt(stakeAmount) < currentPrice) {
      toast({
        title: "Invalid Stake Amount",
        description: `Your stake must be at least ${currentPrice} SORA tokens.`,
        variant: "destructive",
      });
      return;
    }
    
    const newStake = parseInt(stakeAmount);
    
    // Add user to participants
    setParticipants(prev => [
      ...prev,
      { id: 6, name: 'Your Institution', region: 'Your Region', stake: newStake }
    ].sort((a, b) => b.stake - a.stake));
    
    setRemainingSeats(prev => prev - 1);
    setIsJoined(true);
    
    toast({
      title: "Success!",
      description: "You've successfully joined the Knee AI Subnet!",
    });
  };

  return (
    <Layout>
      <SectionHeader 
        title="Subnet Dutch Auction" 
        description="Secure your seat in the Knee AI Subnet through our Dutch auction mechanism"
        icon={<Gavel className="h-8 w-8" />}
      />
      
      {!isJoined ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="glass-card bg-gradient-to-br from-blue-200/40 via-white/70 to-emerald-100/40 shadow-lg border-0 backdrop-blur-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Live Auction: Knee AI Subnet</CardTitle>
                  <Badge label="Active" variant="success" />
                </div>
                <CardDescription>
                  The price decreases over time until all seats are filled
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <CoinsIcon className="h-5 w-5 text-sorachain-primary mr-2" />
                        <p className="text-sm font-medium">Current Price</p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-3xl font-bold">{currentPrice}</p>
                        <span className="ml-2 text-sm text-gray-500">SORA</span>
                      </div>
                      <div className="flex items-center mt-1 text-green-600">
                        <TrendingDown className="h-4 w-4 mr-1" />
                        <span className="text-xs">Dropping</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Clock className="h-5 w-5 text-sorachain-primary mr-2" />
                        <p className="text-sm font-medium">Time Remaining</p>
                      </div>
                      <p className="text-3xl font-bold">{formatTime(timeRemaining)}</p>
                      <p className="text-xs text-gray-500 mt-1">Until auction ends</p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Users className="h-5 w-5 text-sorachain-primary mr-2" />
                        <p className="text-sm font-medium">Available Seats</p>
                      </div>
                      <p className="text-3xl font-bold">{remainingSeats}</p>
                      <div className="mt-1">
                        <Progress value={(20 - remainingSeats) * 5} className="h-2" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-medium mb-4">Join Subnet</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label htmlFor="stake" className="text-sm font-medium">Stake Amount (SORA tokens)</label>
                          <span className="text-xs text-gray-500">Min: {currentPrice} SORA</span>
                        </div>
                        <div className="flex space-x-2">
                          <div className="relative flex-1">
                            <Input 
                              id="stake"
                              type="number"
                              placeholder="Enter stake amount"
                              value={stakeAmount}
                              onChange={(e) => setStakeAmount(e.target.value)}
                              className="pl-8"
                              min={currentPrice}
                            />
                            <CoinsIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                          </div>
                          <Button variant="outline" onClick={() => setStakeAmount(currentPrice.toString())}>
                            Min
                          </Button>
                          <Button variant="outline" onClick={() => setStakeAmount((currentPrice * 1.2).toString())}>
                            +20%
                          </Button>
                        </div>
                      </div>
                      
                      <Button className="sorachain-button w-full" onClick={handleJoinSubnet}>
                        Join Subnet
                      </Button>
                      
                      <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                        <Lock className="h-3 w-3" />
                        <span>Tokens will be staked until the training is complete</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="glass-card bg-gradient-to-br from-blue-100/30 to-purple-100/40 border-0 shadow-md">
              <CardHeader>
                <CardTitle>Participant Leaderboard</CardTitle>
                <CardDescription>
                  Institutions ranked by stake amount
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {participants
                    .sort((a, b) => b.stake - a.stake)
                    .map((participant, index) => (
                      <div key={participant.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${index < 3 ? 'bg-sorachain-primary text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{participant.name}</p>
                            <p className="text-xs text-gray-500">{participant.region}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{participant.stake}</p>
                          <p className="text-xs text-gray-500">SORA</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <Card className="glass-card bg-gradient-to-br from-emerald-100/50 to-cyan-100/70 border-0 shadow-lg border-green-100 dark:border-green-900 dark:bg-green-900/40">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-500" />
              <CardTitle className="text-green-800 dark:text-green-500">Success! You've Secured a Seat</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-6">
              <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mb-4">
                <Award className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-center mb-2">You've secured a seat in Subnet #Knee-AI!</h2>
              <p className="text-gray-600 dark:text-gray-300 text-center max-w-md mb-6">
                Your institution is now part of the collaborative effort to build a privacy-preserving knee diagnosis AI model.
              </p>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 w-full max-w-md shadow-sm mb-6">
                <h3 className="font-medium mb-2">Your Participation Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Stake Amount:</span>
                    <span className="font-medium">{stakeAmount} SORA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Subnet Position:</span>
                    <span className="font-medium">#{participants.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Training Begins:</span>
                    <span className="font-medium">In 48 hours</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/training">
                  <Button className="sorachain-button">
                    Go to Training Dashboard
                  </Button>
                </Link>
                <Button variant="outline">
                  Download Subnet Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="mt-10">
        <Card className="glass-card bg-gradient-to-r from-blue-100/30 to-purple-100/40 border-0 backdrop-blur-md shadow-md">
          <CardHeader>
            <CardTitle>How Dutch Auctions Work</CardTitle>
            <CardDescription>Understanding the SoraChain subnet allocation process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                In a Dutch auction, the price starts high and gradually decreases until participants are willing to join at the current price point.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-sorachain-light flex items-center justify-center text-sorachain-primary font-medium mr-3 mt-0.5">1</div>
                  <div>
                    <h3 className="font-medium">Starting High</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      The auction begins with a high token price that gradually decreases over time.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-sorachain-light flex items-center justify-center text-sorachain-primary font-medium mr-3 mt-0.5">2</div>
                  <div>
                    <h3 className="font-medium">Strategic Decisions</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Participants must decide when to join: wait for a lower price, but risk losing a seat.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-sorachain-light flex items-center justify-center text-sorachain-primary font-medium mr-3 mt-0.5">3</div>
                  <div>
                    <h3 className="font-medium">Ordering by Stake</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Higher stakes get higher priority and better rewards during model training.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-sorachain-light flex items-center justify-center text-sorachain-primary font-medium mr-3 mt-0.5">4</div>
                  <div>
                    <h3 className="font-medium">Completion</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      The auction ends when all seats are filled or the time expires.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Auction;
