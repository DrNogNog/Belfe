import React from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

const SKILLS = [
  { name: 'Foundation', tutorials: ['Smokey Eyes', 'Cut Crease', 'Basic Eye Makeup'] },
  { name: 'Eye Makeup', tutorials: [] },
  { name: 'Concealer', tutorials: [] }
];

const PROGRESS = [
  { skill: 'Smokey Eyes', level: 'Beginner', completed: true },
  { skill: 'Cut Crease', level: 'Intermediate', completed: true },
  { skill: 'Basic Eye Makeup', level: 'Expert', completed: false }
];

export function SkillTracker() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="grid grid-cols-2 gap-6">
        {/* Skills List */}
        <div className="border rounded-lg p-4">
          <h3 className="text-gray-500 font-medium mb-4">Skill</h3>
          <div className="text-gray-500 space-y-4">
            {SKILLS.map((skill, index) => (
              <div key={index} className="p-3 border rounded-lg">
                {skill.name}
              </div>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className="border rounded-lg p-4">
          <h3 className="text-gray-500 font-medium mb-4">Progress</h3>
          <div className="text-gray-500 space-y-4">
            {PROGRESS.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{item.skill}</span>
                <div className="flex items-center gap-2">
                  <span>{item.level}</span>
                  {item.completed && <span>✓</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tutorials */}
        <div className="border rounded-lg p-4">
          <h3 className="text-gray-500 font-medium mb-4">Tutorials</h3>
          <div className="text-gray-500 space-y-2">
            {SKILLS[0].tutorials.map((tutorial, index) => (
              <button
                key={index}
                className="flex items-center gap-2 w-full p-2 bg-gray-50 rounded hover:bg-gray-100"
              >
                <Play className="w-4 h-4" />
                <span>How to put on {tutorial}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tutorial Video */}
        <div className="border rounded-lg p-4 flex items-center justify-between">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-gray-500 text-center">Foundation</div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}