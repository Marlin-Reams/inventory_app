import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

function CountHistory() {
  const [countHistory, setCountHistory] = useState([]); // Initialize as an empty array
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredCounts, setFilteredCounts] = useState([]); // Initialize as an empty array
  const [selectedSession, setSelectedSession] = useState(null);

  const fetchCounts = async () => {
    try {
      const countCollection = collection(db, "countHistory");
      const snapshot = await getDocs(countCollection);
      const counts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCountHistory(counts);
      setFilteredCounts(counts); // Initialize filteredCounts
    } catch (error) {
      console.error("Error fetching count history:", error);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);

    if (!selectedDate) {
      setFilteredCounts(countHistory); // Show all counts if no date is selected
      return;
    }

    const filtered = countHistory.filter((count) => count.date === selectedDate);
    setFilteredCounts(filtered);
  };

  const handleRemoveCount = async (id) => {
    if (window.confirm("Are you sure you want to delete this count?")) {
      try {
        await deleteDoc(doc(db, "countHistory", id));
        setCountHistory((prev) => prev.filter((count) => count.id !== id));
        setFilteredCounts((prev) => prev.filter((count) => count.id !== id));
        alert("Count removed successfully.");
      } catch (error) {
        console.error("Error deleting count:", error);
        alert("Failed to delete count.");
      }
    }
  };

  const handleViewSession = (sessionId) => {
    const session = countHistory.find((count) => count.id === sessionId);
    setSelectedSession(session);
  };

  const handleGeneratePDF = () => {
    if (!selectedSession) return;

    const doc = new jsPDF();
    const { date, category, items } = selectedSession;

    doc.text(`Count Session - ${date} - ${category}`, 10, 10);
    doc.autoTable({
      startY: 20,
      head: [["Article Number", "Description", "Counted Quantity", "Stock Level", "Discrepancy"]],
      body: items.map((item) => [
        item.articleNumber,
        item.description,
        item.countedQuantity,
        item.stockLevel,
        item.stockLevel - (item.countedQuantity || 0),
      ]),
    });

    doc.save(`Count_Session_${date}_${category}.pdf`);
  };

  const renderSessionDetails = () => {
    if (!selectedSession) return null;

    return (
      <div style={{ marginTop: "20px" }}>
        <h3>Details for {selectedSession.date} - {selectedSession.category}</h3>
        <table
          border="1"
          style={{
            width: "100%",
            textAlign: "left",
            borderCollapse: "collapse",
            marginTop: "10px",
          }}
        >
          <thead>
            <tr>
              <th>Article Number</th>
              <th>Description</th>
              <th>Counted Quantity</th>
              <th>Stock Level</th>
              <th>Discrepancy</th>
            </tr>
          </thead>
          <tbody>
            {selectedSession.items.map((item, index) => (
              <tr key={index}>
                <td>{item.articleNumber}</td>
                <td>{item.description}</td>
                <td>{item.countedQuantity}</td>
                <td>{item.stockLevel}</td>
                <td>{item.stockLevel - (item.countedQuantity || 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleGeneratePDF} style={{ marginTop: "10px" }}>
          Generate PDF
        </button>
        <button onClick={() => setSelectedSession(null)} style={{ marginTop: "10px", marginLeft: "10px" }}>
          Close Details
        </button>
      </div>
    );
  };

  return (
    <div>
      <h2>Count History</h2>
      <label>
        Select Date:
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          style={{ marginLeft: "10px" }}
        />
      </label>

      {Array.isArray(filteredCounts) && filteredCounts.length > 0 ? (
        <table
          border="1"
          style={{
            width: "100%",
            textAlign: "left",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Items Counted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCounts.map((count) => (
              <tr key={count.id}>
                <td>{count.date}</td>
                <td>{count.category}</td>
                <td>{count.items?.length || 0}</td>
                <td>
                  <button onClick={() => handleViewSession(count.id)}>
                    View Details
                  </button>
                  <button onClick={() => handleRemoveCount(count.id)} style={{ marginLeft: "10px" }}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No counts available for the selected date or overall.</p>
      )}

      {/* Render session details if one is selected */}
      {renderSessionDetails()}
    </div>
  );
}

export default CountHistory;







