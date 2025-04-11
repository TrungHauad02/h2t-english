import React from 'react';
import { ToeicPart3_4 } from 'interfaces';
import Part3_4Section from './Part3_4Section';

interface Part4SectionProps {
  questions: ToeicPart3_4[];
}

export default function Part4Section({
  questions
}: Part4SectionProps) {
  return (
    <Part3_4Section 
      questions={questions} 
      partNumber={4} 
    />
  );
}