import { useState } from "react";

interface Officer {
  name: string;
  designation: string;
}

export default function AddOfficer() {
  // State for officer name and designation
  const [officers, setOfficers] = useState<Officer[]>([]);

  // Temporary state for individual officer data
  const [officerData, setOfficerData] = useState<Officer>({
    name: "",
    designation: "President", // default to 'President'
  });

  // Handle input change for name
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOfficerData({
      ...officerData,
      name: e.target.value, // Update only the name
    });
  };

  // Handle designation change
  const handleDesignationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOfficerData({
      ...officerData,
      designation: e.target.value, // Update only the designation
    });
  };

  // Add officer to the list of officers
  const addOfficerToList = () => {
    setOfficers([...officers, officerData]);
    setOfficerData({ name: "", designation: "President" }); // Reset form after adding
  };

  // Handle submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/officer/add-officer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(officers), // Send array of officers to backend
      });

      if (response.ok) {
        alert("Officers added successfully!");
      } else {
        alert("Failed to add officers");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Officer</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input for officer name */}
        <div className="flex space-x-4">
          <label className="border p-2 w-full">Officer Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={officerData.name}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        {/* Dropdown for designation */}
        <div className="flex space-x-4">
          <label className="border p-2 w-full">Designation</label>
          <select
            name="designation"
            value={officerData.designation}
            onChange={handleDesignationChange}
            className="border p-2 w-full"
          >
            <option value="President">President</option>
            <option value="Secretary">Secretary</option>
            <option value="Treasurer">Treasurer</option>
            <option value="Assistant Secretary">Assistant Secretary</option>
            <option value="Assistant Treasurer">Assistant Treasurer</option>
          </select>
        </div>

        {/* Button to add officer to the list */}
        <button
          type="button"
          onClick={addOfficerToList}
          className="bg-green-500 text-white p-2 rounded"
        >
          Add Officer to List
        </button>

        {/* Display list of added officers */}
        <div>
          <h2 className="text-xl font-semibold mt-4">Officers List:</h2>
          <ul className="list-disc ml-5">
            {officers.map((officer, index) => (
              <li key={index}>
                {officer.name} - {officer.designation}
              </li>
            ))}
          </ul>
        </div>

        {/* Submit button */}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit Officers to Backend
        </button>
      </form>
    </div>
  );
}
