<!-- DoctorSchedule.vue -->
<template>
    <div class="schedule-container">
      <h2 class="schedule-title">Lịch làm việc - {{ doctorName }}</h2>
      
      <!-- Week Navigation -->
      <div class="week-navigation">
        <button 
          @click="currentWeek > 1 ? currentWeek-- : null"
          class="nav-button"
          :disabled="currentWeek === 1"
        >
          Tuần trước
        </button>
        <span class="week-indicator">Tuần {{ currentWeek }}/3</span>
        <button 
          @click="currentWeek < 3 ? currentWeek++ : null"
          class="nav-button"
          :disabled="currentWeek === 3"
        >
          Tuần sau
        </button>
      </div>
  
      <!-- Schedule Grid -->
      <div class="schedule-grid">
        <!-- Header -->
        <div class="grid-header">
          <div class="header-cell">Thời gian</div>
          <div v-for="day in daysOfWeek" :key="day" class="header-cell">
            {{ day }}
          </div>
        </div>
  
        <!-- Time Slots -->
        <div v-for="timeSlot in timeSlots" :key="timeSlot.time" class="grid-row">
          <div class="time-cell">{{ timeSlot.time }}</div>
          <div 
            v-for="day in daysOfWeek" 
            :key="day"
            class="slot-cell"
            :class="getSlotClass(timeSlot.time, day)"
          >
            {{ getSlotStatus(timeSlot.time, day) }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DoctorSchedule',
    data() {
      return {
        currentWeek: 1,
        scheduleData: [],
        daysOfWeek: ['THỨ HAI', 'THỨ BA', 'THỨ TƯ', 'THỨ NĂM', 'THỨ SÁU', 'THỨ BẢY', 'CHỦ NHẬT'],
        timeSlots: [
          { time: '08:00-09:00' },
          { time: '09:00-10:00' },
          { time: '10:00-11:00' },
          { time: '11:00-12:00' },
          { time: '13:00-14:00' },
          { time: '14:00-15:00' },
          { time: '15:00-16:00' },
          { time: '16:00-17:00' },
        ],
        doctorName: ''
      }
    },
    methods: {
      async fetchSchedule() {
        try {
          const response = await fetch('https://api.unime.site/UNIME/doctortimework/get/listByDoctor')
          const data = await response.json()
          if (data.code === 1000) {
            this.scheduleData = data.result
            if (this.scheduleData.length > 0) {
              this.doctorName = this.scheduleData[0].doctorName
            }
          }
        } catch (error) {
          console.error('Error fetching schedule:', error)
        }
      },
      getSlotClass(timeSlot, day) {
        const [startTime] = timeSlot.split('-')
        const slot = this.scheduleData.find(s => 
          s.startTime === startTime && 
          this.getDayName(s.dayOfWeek) === day &&
          s.weekOfYear === this.getCurrentWeekNumber()
        )
  
        return {
          'available': slot?.doctorTimeworkStatus === 'Available',
          'busy': slot?.doctorTimeworkStatus === 'Busy',
          'empty': !slot
        }
      },
      getSlotStatus(timeSlot, day) {
        const [startTime] = timeSlot.split('-')
        const slot = this.scheduleData.find(s => 
          s.startTime === startTime && 
          this.getDayName(s.dayOfWeek) === day &&
          s.weekOfYear === this.getCurrentWeekNumber()
        )
  
        return slot?.doctorTimeworkStatus || 'N/A'
      },
      getDayName(englishDay) {
        const dayMapping = {
          'MONDAY': 'THỨ HAI',
          'TUESDAY': 'THỨ BA',
          'WEDNESDAY': 'THỨ TƯ',
          'THURSDAY': 'THỨ NĂM',
          'FRIDAY': 'THỨ SÁU',
          'SATURDAY': 'THỨ BẢY',
          'SUNDAY': 'CHỦ NHẬT'
        }
        return dayMapping[englishDay]
      },
      getCurrentWeekNumber() {
        const baseWeek = 52 // Starting week number
        return baseWeek + this.currentWeek - 1
      }
    },
    mounted() {
      this.fetchSchedule()
    }
  }
  </script>
  
  <style scoped>
  .schedule-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .schedule-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .week-navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .nav-button {
    padding: 8px 16px;
    background-color: #2196f3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .nav-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .week-indicator {
    font-weight: bold;
  }
  
  .schedule-grid {
    border: 1px solid #e0e0e0;
    padding: 16px;
    border-radius: 8px;
  }
  
  .grid-header {
    display: grid;
    grid-template-columns: 120px repeat(7, 1fr);
    gap: 8px;
    margin-bottom: 10px;
  }
  
  .header-cell {
    font-weight: bold;
    text-align: center;
  }
  
  .grid-row {
    display: grid;
    grid-template-columns: 120px repeat(7, 1fr);
    gap: 8px;
    margin-bottom: 8px;
  }
  
  .time-cell {
    font-weight: 500;
  }
  
  .slot-cell {
    padding: 8px;
    text-align: center;
    border-radius: 4px;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
  }
  
  .slot-cell.available {
    background-color: #e8f5e9;
    color: #2e7d32;
  }
  
  .slot-cell.busy {
    background-color: #ffebee;
    color: #c62828;
  }
  
  .slot-cell.empty {
    background-color: #f5f5f5;
    color: #757575;
  }
  </style>