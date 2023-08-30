"use client";
import React, { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import { UserData } from "../types";
import User from "./User";
import openseachAPI from "../api/openseachAPI";

const Search = () => {
  const MIN_AGE = 0;
  const MAX_AGE = 120;

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);

  const [users, setUsers] = useState<UserData[]>([]);
  const [ageRange, setAgeRange] = useState<[number, number]>([MIN_AGE, MAX_AGE]);
  const [selectedUser, setSelectedUser] = useState<UserData>();

  useEffect(() => {
    if (debouncedQuery.length < 3) {
      setUsers([]);
      return;
    }
    openseachAPI.fetchUsers(debouncedQuery, ageRange).then((data) => setUsers(data));
  }, [debouncedQuery]);

  return (
    <div className="w-full h-screen flex flex-col items-center p-4">
      <div className="flex gap-2 items-center">
        <div className="w-[400px] relative">
          <input
            onBlur={() => setTimeout(() => setUsers([]), 100)}
            className="w-full p-2 border border-neutral-500 rounded-md bg-transparent"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
          />

          {users.length > 0 && (
            <div className="border rounded-md overflow-clip border-neutral-500 mt-2 absolute w-full bg-black flex flex-col">
              {users.map((user: any) => (
                <div
                  className="hover:bg-neutral-900 p-2 flex items-center justify-between"
                  onClick={() => setSelectedUser(user._source)}
                  key={user._id}
                >
                  <div className="flex items-center gap-2">
                    <img className="rounded-full border h-[30px] w-[30px]" src={user._source.image} />{" "}
                    <span>
                      {user._source.firstName} {user._source.lastName} {user._source.age}
                    </span>
                  </div>
                  {user._source.address.city}
                </div>
              ))}
            </div>
          )}
        </div>
        <label htmlFor="age-start">Age</label>
        <input
          id="age-start"
          className="p-2 border w-[80px] border-neutral-500 rounded-md bg-transparent"
          min={MIN_AGE}
          value={ageRange[0]}
          onChange={(e) => setAgeRange([parseInt(e.target.value), ageRange[1]])}
          type="number"
        />
        <span>-</span>
        <input
          className="w-[80px] p-2 border border-neutral-500 rounded-md bg-transparent"
          value={ageRange[1]}
          max={MAX_AGE}
          onChange={(e) => setAgeRange([ageRange[0], parseInt(e.target.value)])}
          type="number"
        />
      </div>
      <div className="m-auto">{selectedUser && <User user={selectedUser} />}</div>
    </div>
  );
};

export default Search;
