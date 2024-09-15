import { useEffect, useState } from "react";
import axios from "axios";
import { Member } from "@/interface/member";

const AddMember = () => {
  const initialMemberState: Member = {
    name: "",
    mobile: "",
    faculty: "",
    batch: 0,
    email: "",
    password: "",
    addedBy: "",
    ratings: 0,
    district: "",
  };
  const [member, setMember] = useState<Member>(initialMemberState);
  const [batchYears, setBatchYears] = useState<number[]>([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length:5 }, (_,i) => currentYear-(i+1));
    setBatchYears(years);
  },[]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/member/add', member);
      console.log("Member added:", res.data);

      setMember(initialMemberState);
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-center text-3xl font-bold mb-6">Add Member</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-semibold">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                value={member.name}
                onChange={(e) => setMember({ ...member, name: e.target.value })}
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>

            {/* Mobile */}
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-semibold">Mobile No.</label>
              <input
                type="text"
                placeholder="Enter mobile number"
                value={member.mobile}
                onChange={(e) => setMember({ ...member, mobile: e.target.value })}
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>

            {/* Faculty */}
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-semibold">Faculty</label>
              <select
                value={member.faculty}
                onChange={(e) => setMember({ ...member, faculty: e.target.value })}
                className="border border-gray-300 p-2 rounded w-full"
                required
              >
                <option value="" disabled>Select Faculty</option>
                <option value="Faculty of Architecture">Faculty of Architecture</option>
                <option value="Faculty of Business">Faculty of Business</option>
                <option value="Faculty of Engineering">Faculty of Engineering</option>
                <option value="Faculty of Information Technology">Faculty of IT</option>
                <option value="Faculty of Medicine">Faculty of Medicine</option>
                <option value="NDT">NDT</option>
              </select>
            </div>

            {/* District */}
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-semibold">Distict</label>
              <select
                value={member.faculty}
                onChange={(e) => setMember({ ...member, faculty: e.target.value })}
                className="border border-gray-300 p-2 rounded w-full"
                required
              >
                <option value="" disabled>Select District</option>
                <option value="Ampara">Ampara</option>
                <option value="Anuradhapura">Anuradhapura</option>
                <option value="Badulla">Badulla</option>
                <option value="Batticaloa">Batticaloa</option>
                <option value="Colombo">Colombo</option>
                <option value="Galle">	Galle</option>
                <option value="Gampaha">Gampaha</option>
                <option value="Hambantota">Hambantota</option>
                <option value="Jaffna">Jaffna</option>
                <option value="Kalutara">Kalutara</option>
                <option value="Kandy">Kandy</option>
                <option value="Kegalle">Kegalle</option>
                <option value="Kilinochchi">Kilinochchi</option>
                <option value="Kurunegala">Kurunegala</option>
                <option value="Mannar">Mannar</option>
                <option value="Matale">Matale</option>
                <option value="	Matara">Matara</option>
                <option value="Monaragala">Monaragala</option>
                <option value="Mullaitivu">Mullaitivu</option>
                <option value="Nuwara Eliya">Nuwara Eliya</option>
                <option value="Polonnaruwa">Polonnaruwa</option>
                <option value="Puttalam">Puttalam</option>
                <option value="Ratnapura">Ratnapura</option>
                <option value="Trincomalee">Trincomalee</option>
                <option value="Vavuniya">Vavuniya</option>
              </select>
            </div>

            {/* Batch */}
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-semibold">Batch</label>
              <select
                value={member.batch}
                onChange={(e) => setMember({...member,batch:Number(e.target.value)})}
                className="border border-gray-300 p-2 rounded w-full"
                required
                >
                    <option value="0" disabled>Select Batch</option>
                    {batchYears.map((year) =>(
                        <option key={year} value={year - 2000}>{year - 2000}</option>
                    ))}
                    </select>
            </div>

            {/* Email */}
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-semibold">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={member.email}
                onChange={(e) => setMember({ ...member, email: e.target.value })}
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-semibold">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={member.password}
                onChange={(e) => setMember({ ...member, password: e.target.value })}
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>

            {/* Added By */}
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-semibold">Added By</label>
              <input
                type="text"
                placeholder="Enter who added"
                value={member.addedBy}
                onChange={(e) => setMember({ ...member, addedBy: e.target.value })}
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>
          </div>

          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            Add Member
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMember;
