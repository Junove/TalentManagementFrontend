import React from 'react'
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const CandidateDashboardChart = (props) => {
    const {
        applications
    } = props;

    const underReviewValue = applications.filter((app) => app.application_status === 'Under Review').length; 
    const interviewScheduledValue = applications.filter((app) => app.application_status === 'Interview Scheduled').length;
    const rejectedValue = applications.filter((app) => app.application_status === 'Rejected').length;
    const hiredValue = applications.filter((app) => app.application_status === 'Hired').length;

    const applicationsData = [
        { name: 'Under Review', value: underReviewValue, color: '#23DC3D' },
        { name: 'Interview Scheduled', value: interviewScheduledValue, color: '#23DC3D'},
        { name: 'Rejected', value: rejectedValue, color: '#D10000' },
        { name: 'Hired', value: hiredValue, color: '23DC3D' }
    ];

    const renderLabel = function(entry) {
      return `${entry.name}: ${entry.value}`;
    }
    
    const COLORS = ['#FFBB28', '#0088FE', '#D10000', '#00BF00'];

  return (
        <PieChart width={500} height={300}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={applicationsData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#00Bf00"
            label={renderLabel}
          >
            {applications.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
  )
}

export default CandidateDashboardChart