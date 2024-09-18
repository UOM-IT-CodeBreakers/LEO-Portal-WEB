import React, { useState, useEffect } from "react";
import { Member } from "@/interface/member"; // Assume you've defined this interface somewhere

export default function MemberSearch() {
    const [query, setQuery] = useState<string>(""); // Search input value
    const [members, setMembers] = useState<Member[]>([]); // List of members
    const [loading, setLoading] = useState<boolean>(false); // Loading state

    // Fetch members based on search query
    const fetchMembers = async (searchQuery: string) => {
        setLoading(true); // Start loading
        try {
            const response = await fetch(`http://localhost:8080/member/search?name=${searchQuery}`);
            const result = await response.json();
            setMembers(result); // Update member list
        } catch (err) {
            console.error("Error fetching members:", err);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    // Handle input change and trigger search when input has more than 2 characters
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        // Trigger search only if query has more than 2 characters
        if (value.length > 2) {
            fetchMembers(value);
        } else {
            setMembers([]); // Clear members if query is too short
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Search Members</h1>

            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Enter member name"
                className="border p-2 w-full mb-4"
            />

            {/* Show loading indicator if data is being fetched */}
            {loading && <p>Loading...</p>}

            {/* Render members list */}
            <ul className="list-disc ml-5">
                {members.length > 0 ? (
                    members.map((member) => (
                        <li key={member._id}>
                            {member.name} - {member.mobile} - {member.email}
                        </li>
                    ))
                ) : (
                    query.length > 2 && !loading && <p>No members found</p>
                )}
            </ul>
        </div>
    );
}
