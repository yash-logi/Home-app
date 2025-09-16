// Mock data for Smart Home Energy Management System
// This will be replaced with real API calls in backend integration

export const mockDevices = [
  {
    id: 1,
    type: 'ac',
    name: 'Living Room AC',
    isOn: true,
    temperature: 24,
    energyUsage: 1200,
    room: 'Living Room'
  },
  {
    id: 2,
    type: 'heater',
    name: 'Bedroom Heater',
    isOn: false,
    temperature: 22,
    energyUsage: 0,
    room: 'Bedroom'
  },
  {
    id: 3,
    type: 'light',
    name: 'Main Lights',
    isOn: true,
    level: 80,
    energyUsage: 60,
    room: 'All Rooms'
  },
  {
    id: 4,
    type: 'fan',
    name: 'Ceiling Fan',
    isOn: true,
    level: 60,
    energyUsage: 45,
    room: 'Living Room'
  }
];

export const mockEnergyData = {
  currentUsage: 1305, // watts
  dailyUsage: 31.32, // kWh
  monthlyBill: 112.61, // dollars
  savings: 37.39, // dollars saved this month
  efficiency: 'Good' // Excellent, Good, Fair, Poor
};

export const mockUser = {
  id: 1,
  name: 'John Smith',
  email: 'john.smith@email.com',
  age: 72,
  role: 'primary',
  preferences: {
    voice: true,
    notifications: true,
    autoOptimization: true
  }
};

export const mockCaregivers = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@healthcare.com',
    phone: '+1 (555) 123-4567',
    role: 'Healthcare Provider',
    permissions: ['view', 'control', 'emergency'],
    status: 'active',
    lastAccess: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    id: 2,
    name: 'Michael Smith',
    email: 'michael.smith@email.com',
    phone: '+1 (555) 987-6543',
    role: 'Family Member',
    permissions: ['view', 'control'],
    status: 'active',
    lastAccess: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
  }
];

export const mockAccessLogs = [
  {
    id: 1,
    caregiverId: 1,
    caregiver: 'Dr. Sarah Johnson',
    action: 'Turned off heater remotely',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    type: 'control',
    deviceId: 2
  },
  {
    id: 2,
    caregiverId: 2,
    caregiver: 'Michael Smith',
    action: 'Viewed energy usage dashboard',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    type: 'view'
  },
  {
    id: 3,
    caregiverId: 1,
    caregiver: 'Dr. Sarah Johnson',
    action: 'Emergency alert - High temperature detected',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    type: 'emergency',
    deviceId: 2
  }
];

// Mock API functions to simulate backend calls
export const mockApi = {
  // Device management
  getDevices: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockDevices]), 500);
    });
  },

  updateDevice: (deviceId, updates) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const deviceIndex = mockDevices.findIndex(d => d.id === deviceId);
        if (deviceIndex !== -1) {
          mockDevices[deviceIndex] = { ...mockDevices[deviceIndex], ...updates };
          resolve(mockDevices[deviceIndex]);
        } else {
          resolve(null);
        }
      }, 300);
    });
  },

  // Energy monitoring
  getEnergyData: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Calculate real-time data based on current device states
        const currentUsage = mockDevices.reduce((sum, device) => {
          return sum + (device.isOn ? device.energyUsage : 0);
        }, 0);
        
        const updatedData = {
          ...mockEnergyData,
          currentUsage,
          dailyUsage: currentUsage * 24 / 1000,
          monthlyBill: currentUsage * 24 * 30 * 0.12 / 1000
        };
        
        resolve(updatedData);
      }, 400);
    });
  },

  // User management
  getUser: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockUser), 200);
    });
  },

  // Caregiver management
  getCaregivers: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockCaregivers]), 300);
    });
  },

  addCaregiver: (caregiverData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCaregiver = {
          id: Date.now(),
          ...caregiverData,
          permissions: ['view'],
          status: 'pending',
          lastAccess: null
        };
        mockCaregivers.push(newCaregiver);
        resolve(newCaregiver);
      }, 500);
    });
  },

  // Access logs
  getAccessLogs: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockAccessLogs]), 300);
    });
  },

  // Voice commands (simulate processing)
  processVoiceCommand: (command) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = {
          command,
          success: Math.random() > 0.2, // 80% success rate
          action: `Processed: ${command}`,
          timestamp: new Date()
        };
        resolve(result);
      }, 2000);
    });
  }
};
