import React from 'react';

export interface Feature {
    title: string;
    description: string;
    icon: React.ReactNode;
    tags: string[];
}

export interface Stat {
    label: string;
    value: string;
    subtext: string;
}

export interface Testimonial {
    name: string;
    role: string;
    company: string;
    content: string;
    image: string;
}

export enum CarType {
    SEDAN = 'Sedan',
    SUV = 'SUV',
    TRUCK = 'Truck',
    SPORTS = 'Sports Car',
    LUXURY = 'Luxury'
}

export interface DashboardMetric {
    label: string;
    value: string;
    change: string;
    isPositive: boolean;
    icon: React.ElementType;
}

export interface RecentActivity {
    id: string;
    vehicle: string;
    action: string;
    status: 'Processing' | 'Completed' | 'Failed';
    time: string;
}