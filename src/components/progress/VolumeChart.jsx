import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-bg-elevated border border-white/10 rounded-lg p-2 text-xs">
        <p className="text-text-secondary mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }} className="font-semibold">
            {p.name}: {p.value}{p.unit || ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function VolumeChart({ data, exerciseName }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-40 flex items-center justify-center text-text-secondary text-sm">
        No data yet — log some sessions!
      </div>
    );
  }

  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1C1C26" />
          <XAxis dataKey="date" stroke="#8888AA" tick={{ fontSize: 10 }} />
          <YAxis stroke="#8888AA" tick={{ fontSize: 10 }} />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="volume"
            stroke="#6C63FF"
            strokeWidth={2}
            dot={{ fill: '#6C63FF', r: 3 }}
            activeDot={{ r: 5 }}
            name="Volume"
            unit="kg"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function LoadBarChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-32 flex items-center justify-center text-text-secondary text-sm">
        Train more to see load history
      </div>
    );
  }

  return (
    <div className="w-full h-32">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1C1C26" vertical={false} />
          <XAxis dataKey="week" stroke="#8888AA" tick={{ fontSize: 10 }} />
          <YAxis stroke="#8888AA" tick={{ fontSize: 10 }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="load" fill="#6C63FF" radius={[4, 4, 0, 0]} name="Load" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RPETrendChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-32 flex items-center justify-center text-text-secondary text-sm">
        Log RPE after sessions to see trend
      </div>
    );
  }

  return (
    <div className="w-full h-32">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1C1C26" />
          <XAxis dataKey="date" stroke="#8888AA" tick={{ fontSize: 10 }} />
          <YAxis domain={[1, 10]} stroke="#8888AA" tick={{ fontSize: 10 }} />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="rpe"
            stroke="#00D4AA"
            strokeWidth={2}
            dot={{ fill: '#00D4AA', r: 3 }}
            name="RPE"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default VolumeChart;
