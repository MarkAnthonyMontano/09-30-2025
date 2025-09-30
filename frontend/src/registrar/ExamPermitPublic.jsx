import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ExamPermitPublic() {
  const { applicantNo } = useParams();
  const [person, setPerson] = useState(null);
  const [examSchedule, setExamSchedule] = useState(null);

  // 👇 This makes the backend call work on both PC and phone
  const API_BASE = `http://${window.location.hostname}:5000`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get person by applicant number
        const res = await axios.get(`${API_BASE}/api/person-by-applicant/${applicantNo}`);
        setPerson(res.data);

        // Get schedule
        const schedRes = await axios.get(`${API_BASE}/api/exam-schedule/${applicantNo}`);
        setExamSchedule(schedRes.data);
      } catch (err) {
        console.error("Error fetching exam permit:", err);
      }
    };
    fetchData();
  }, [applicantNo]);

  if (!person) return <p>Loading permit...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Exam Permit</h2>
      <p><strong>Name:</strong> {person.first_name} {person.last_name}</p>
      <p><strong>Applicant #:</strong> {applicantNo}</p>
      {examSchedule && (
        <>
          <p><strong>Exam Date:</strong> {examSchedule.exam_date}</p>
          <p><strong>Room:</strong> {examSchedule.room}</p>
        </>
      )}
      {/* Optionally display applicant photo */}
      {person.image && <img src={person.image} alt="Applicant" width="150" />}
    </div>
  );
}
