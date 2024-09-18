import { useState, ChangeEvent, FormEvent } from 'react';

interface OfficerDesignation {
  designation: string;
}

export default function AddDesignation() {
  const [designations, setDesignations] = useState<string[]>(['']);
  const [message, setMessage] = useState<string>('');

  const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const newDesignations = [...designations];
    newDesignations[index] = event.target.value;
    setDesignations(newDesignations);
  };

  const handleAddField = () => {
    setDesignations([...designations, '']);
  };

  const handleRemoveField = (index: number) => {
    const newDesignations = designations.filter((_, i) => i !== index);
    setDesignations(newDesignations);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    
    try {
      const res = await fetch('http://localhost:8080/officer/add-designation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ designation: designations }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setMessage('Designations added successfully!');
        setDesignations(['']);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while adding designations.');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8'>
    <div className="max-w-4xl w-full space-y-8 bg-white p-8 rounded-lg shadow-lg ">
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Add Designations</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {designations.map((designation, index) => (
          <div key={index} className="flex space-x-4 items-center">
            <input
              type="text"
              value={designation}
              onChange={(event) => handleInputChange(index, event)}
              className="border rounded px-3 py-2 w-full"
              placeholder="Enter designation"
              required
            />
            {designations.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveField(index)}
                className="bg-red-500 text-white px-3 py-2 rounded"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddField}
          className="bg-blue-500 text-white px-3 py-2 rounded"
        >
          Add Another
        </button>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>

      {message && (
        <p className="mt-4 text-lg font-semibold">{message}</p>
      )}
    </div>
    </div>
    </div>
  );
}
