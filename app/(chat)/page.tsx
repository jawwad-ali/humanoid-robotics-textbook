import React from 'react';

const get_health = async () => {
  const res = await fetch("http://localhost:8000/health");
  console.log('res', res)
  return res.json();
};

export default async function Page() {
  const health = await get_health();
  console.log('health', health);

  return (
    <div className="h-full">
      {
        JSON.stringify(health)
      }
    </div>
  )
}