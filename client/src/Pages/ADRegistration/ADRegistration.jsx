import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";

const ADRegistration = () => {
  const [isADModalOpen, setIsADModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [ADList, setADList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    gender: "",
    age: "",
    mobileNumber: "",
    whatsappNumber: "",
    imoNumber: "",
    messengerId: "",
    email: "",
    alternateContact: "",
    nationalId: "",
    educationStatus: "",
    // Location Information
    region: "",
    coordinates: "",
    aez: "",
    hotspot: "",
    csa: "",
    // Rice Crop Details
    farmSize: "",
    landType: "",
    cultivationSeason: "",
    majorCrops: "",
    croppingPattern: "",
    riceVarieties: "",
    plantingMethod: "",
    irrigationPractices: "",
    fertilizerUsage: "",
    soilType: "",
    avgProduction: "",
    role: "AD",
  });
  const fetchADs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/farmers/farmers/role/AD");
      if (response.ok) {
        const data = await response.json();
        setADList(data);
      } else {
        throw new Error("Failed to fetch ADs");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchADs();
  }, []);
  // Define the available columns and their initial visibility state
  const initialColumns = [
    { name: "ID", visible: true },
    { name: "AD Name", visible: true },
    { name: "Father Name", visible: true },
    { name: "Gender", visible: true },
    { name: "Age", visible: true },
    { name: "Mobile Number", visible: true },
    { name: "Whatsapp Number", visible: true },
    { name: "Imo Number", visible: true },
    { name: "Messenger ID", visible: true },
    { name: "Email", visible: true },
    { name: "Alternate Contact", visible: true },
    { name: "National ID", visible: true },
    { name: "Education Status", visible: true },
    // Location Information
    { name: "Region", visible: true },
    { name: "Coordinates", visible: true },
    { name: "AEZ", visible: true },
    { name: "Hotspot", visible: true },
    { name: "CSA", visible: true },
    // Rice Crop Details
    { name: "Farm Size", visible: true },
    { name: "Land Type", visible: true },
    { name: "Cultivation Season", visible: true },
    { name: "Major Crops", visible: true },
    { name: "Cropping Pattern", visible: true },
    { name: "Rice Varieties", visible: true },
    { name: "Planting Method", visible: true },
    { name: "Irrigation Practices", visible: true },
    { name: "Fertilizer Usage", visible: true },
    { name: "Soil Type", visible: true },
    { name: "Avg Production", visible: true },
  ];


  const [columns, setColumns] = useState(initialColumns);

  const toggleColumnModal = () => setIsColumnModalOpen(!isColumnModalOpen);

  // Handle column visibility toggle
  const handleColumnToggle = (columnName) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.name === columnName ? { ...col, visible: !col.visible } : col
      )
    );
  };
  const toggleADModal = () => {
    setIsADModalOpen(!isADModalOpen);
    resetForm();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep((prev) => prev + 1);
    else console.log("Form Data: ", formData);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };
  const resetForm = () => setCurrentStep(1);
  const closeModal = () => {
    setIsADModalOpen(false);
  };
  const registerAD = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/farmers/farmers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        setIsADModalOpen(false);
        console.log("AD registered successfully:", data);
        fetchADs();
      } else {
        throw new Error("Failed to register AD");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // Filter ADList based on search text
  const filteredADs = ADList.filter((AD) => {
    return (
      AD.name.toLowerCase().includes(searchText.toLowerCase()) ||
      AD.mobileNumber.includes(searchText) ||
      AD.email.toLowerCase().includes(searchText.toLowerCase())
    );
  });
  return (
    <div className="min-h-screen w-full bg-gray-100">

      {/* Main Content */}
      <main className=" md:p-6 lg:p-8">
        <div className="container mx-auto bg-white rounded-lg shadow-md p-6 ">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">AD List</h1>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={toggleADModal}
            >
              + Add AD
            </button>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col md:flex-row items-center justify-between mt-4 w-full space-y-3 md:space-y-0">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by Name, Phone, or Email"
              className="border rounded px-4 py-2 w-full md:w-1/2 lg:w-1/3"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            {/* Buttons & Select Section */}
            <div className="flex flex-wrap justify-center md:justify-end space-x-2">
              <select
                className="border rounded px-4 py-2"
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
              >
                <option value={10}>Show 10</option>
                <option value={25}>Show 25</option>
                <option value={50}>Show 50</option>
              </select>
              <button className="border px-4 py-2 rounded hover:bg-gray-100">Copy</button>
              <button className="border px-4 py-2 rounded hover:bg-gray-100">Excel</button>
              <button className="border px-4 py-2 rounded hover:bg-gray-100">CSV</button>
              <button className="border px-4 py-2 rounded hover:bg-gray-100">PDF</button>
              <button
                className="border px-4 py-2 rounded hover:bg-gray-100 flex items-center justify-center"
                onClick={toggleColumnModal}
              >
                <FaBars className="text-lg" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="max-w-[150vh]  overflow-x-scroll">
            <table className="table-auto w-full mt-4 border rounded ">
              <thead>
                <tr className="bg-gray-200">
                  {columns
                    .filter((col) => col.visible)
                    .map((col) => (
                      <th key={col.name} className="border px-4 py-2">
                        {col.name}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {filteredADs.slice(0, rowsPerPage).map(AD => (
                  <tr key={AD.id}>
                    {columns
                      .filter((col) => col.visible)
                      .map((col) => (
                        <td key={col.name} className="border px-4 py-2">
                          {/* Render AD data dynamically based on column names */}
                          {col.name === "ID" && AD.id}
                          {col.name === "AD Name" && AD.name}
                          {col.name === "Father Name" && AD.fatherName}
                          {col.name === "Gender" && AD.gender}
                          {col.name === "Age" && AD.age}
                          {col.name === "Mobile Number" && AD.mobileNumber}
                          {col.name === "Whatsapp Number" && AD.whatsappNumber}
                          {col.name === "Imo Number" && AD.imoNumber}
                          {col.name === "Messenger ID" && AD.messengerId}
                          {col.name === "Email" && AD.email}
                          {col.name === "Alternate Contact" && AD.alternateContact}
                          {col.name === "National ID" && AD.nationalId}
                          {col.name === "Agriculture Card" && AD.agrilCard}
                          {col.name === "Education Status" && AD.educationStatus}
                          {col.name === "Region" && AD.region}
                          {col.name === "Coordinates" && AD.coordinates}
                          {col.name === "AEZ" && AD.aez}
                          {col.name === "Hotspot" && AD.hotspot}
                          {col.name === "CSA" && AD.csa}
                          {col.name === "Farm Size" && AD.farmSize}
                          {col.name === "Land Type" && AD.landType}
                          {col.name === "Cultivation Season" && AD.cultivationSeason}
                          {col.name === "Major Crops" && AD.majorCrops}
                          {col.name === "Cropping Pattern" && AD.croppingPattern}
                          {col.name === "Rice Varieties" && AD.riceVarieties}
                          {col.name === "Planting Method" && AD.plantingMethod}
                          {col.name === "Irrigation Practices" && AD.irrigationPractices}
                          {col.name === "Fertilizer Usage" && AD.fertilizerUsage}
                          {col.name === "Soil Type" && AD.soilType}
                          {col.name === "Avg Production" && AD.avgProduction}
                          {col.name === "Action" && (
                            <i className="fas fa-ellipsis-h text-gray-500"></i>
                          )}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Column Modal */}
        {isColumnModalOpen && (
          <div className="fixed inset-0  z-[999] bg-black bg-opacity-50 flex items-center justify-end">
            <div className="bg-white p-6 rounded shadow-lg w-full md:w-1/3 lg:w-1/3 ">
              <h3 className="text-lg font-semibold mb-4">Select Columns</h3>
              <ul className="space-y-2 max-h-[50vh] overflow-y-scroll">
                {columns.map((col) => (
                  <li key={col.name} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={col.visible}
                      onChange={() => handleColumnToggle(col.name)}
                    />
                    <span>{col.name}</span>
                  </li>
                ))}
              </ul>
              <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={toggleColumnModal}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* AD Modal */}
        {isADModalOpen && (
          <div className=" fixed inset-0 z-[999999] bg-black bg-opacity-50 flex items-center justify-center">
            <div className="relative max-h-[90vh] overflow-y-scroll  bg-white p-6 rounded-lg shadow-lg w-full  md:w-2/3 lg:w-2/3">
              <h3 className="text-lg font-semibold mb-4">AD Registration</h3>
              <button
                className="absolute top-2 right-5 text-xl text-gray-500 hover:text-gray-800"
                onClick={closeModal}
              >
                &times;
              </button>
              <form>
                {/* Step 1: AD Identification */}
                <div className={`space-y-4 ${currentStep === 1 ? "" : "hidden"}`}>
                  <input
                    type="text"
                    name="name"
                    placeholder="AD's Name"
                    className="border w-full p-2 rounded"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="fatherName"
                    placeholder="Father's Name"
                    className="border w-full p-2 rounded"
                    value={formData.fatherName}
                    onChange={handleChange}
                  />
                  <select
                    name="gender"
                    className="border w-full p-2 rounded"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    className="border w-full p-2 rounded"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    className="border w-full p-2 rounded"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="whatsappNumber"
                    placeholder="WhatsApp Number"
                    className="border w-full p-2 rounded"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="imoNumber"
                    placeholder="IMO Number"
                    className="border w-full p-2 rounded"
                    value={formData.imoNumber}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="messengerId"
                    placeholder="Messenger ID"
                    className="border w-full p-2 rounded"
                    value={formData.messengerId}
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="border w-full p-2 rounded"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="alternateContact"
                    placeholder="Alternate Contact"
                    className="border w-full p-2 rounded"
                    value={formData.alternateContact}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="nationalId"
                    placeholder="National ID"
                    className="border w-full p-2 rounded"
                    value={formData.nationalId}
                    onChange={handleChange}
                  />
                  <select
                    name="educationStatus"
                    className="border w-full p-2 rounded"
                    value={formData.educationStatus}
                    onChange={handleChange}
                  >
                    <option value="">Select Education Status</option>
                    <option value="illiterate">Illiterate</option>
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="higher">Higher</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                {/* Step 2: Location Information */}
                <div className={`space-y-4 ${currentStep === 2 ? "" : "hidden"}`}>
                  <input
                    type="text"
                    name="region"
                    placeholder="Region"
                    className="border w-full p-2 rounded"
                    value={formData.region}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="coordinates"
                    placeholder="Coordinates (e.g., Latitude, Longitude)"
                    className="border w-full p-2 rounded"
                    value={formData.coordinates}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="aez"
                    placeholder="AEZ (Agro-Ecological Zone)"
                    className="border w-full p-2 rounded"
                    value={formData.aez}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="hotspot"
                    placeholder="Hotspot"
                    className="border w-full p-2 rounded"
                    value={formData.hotspot}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="csa"
                    placeholder="CSA (Climate Smart Agriculture)"
                    className="border w-full p-2 rounded"
                    value={formData.csa}
                    onChange={handleChange}
                  />
                </div>
                {/* Step 3: Rice Crop Details */}
                <div className={`space-y-4 ${currentStep === 3 ? "" : "hidden"}`}>
                  <input
                    type="text"
                    name="farmSize"
                    placeholder="Farm Size (in acres/hectares)"
                    className="border w-full p-2 rounded"
                    value={formData.farmSize}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="landType"
                    placeholder="Land Type"
                    className="border w-full p-2 rounded"
                    value={formData.landType}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="cultivationSeason"
                    placeholder="Season of Cultivation"
                    className="border w-full p-2 rounded"
                    value={formData.cultivationSeason}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="majorCrops"
                    placeholder="Major Crops"
                    className="border w-full p-2 rounded"
                    value={formData.majorCrops}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="croppingPattern"
                    placeholder="Cropping Pattern"
                    className="border w-full p-2 rounded"
                    value={formData.croppingPattern}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="riceVarieties"
                    placeholder="Rice Varieties"
                    className="border w-full p-2 rounded"
                    value={formData.riceVarieties}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="plantingMethod"
                    placeholder="Planting Method"
                    className="border w-full p-2 rounded"
                    value={formData.plantingMethod}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="irrigationPractices"
                    placeholder="Irrigation Practices"
                    className="border w-full p-2 rounded"
                    value={formData.irrigationPractices}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="fertilizerUsage"
                    placeholder="Fertilizer Usage"
                    className="border w-full p-2 rounded"
                    value={formData.fertilizerUsage}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="soilType"
                    placeholder="Soil Type"
                    className="border w-full p-2 rounded"
                    value={formData.soilType}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="avgProduction"
                    placeholder="Average Production (e.g., per season/year)"
                    className="border w-full p-2 rounded"
                    value={formData.avgProduction}
                    onChange={handleChange}
                  />
                </div>
              </form>

              {/* Navigation Buttons */}
              <div className="flex justify-between space-x-4 mt-4">
                <button
                  className={`bg-gray-400 text-white px-4 py-2 rounded ${currentStep === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-500"
                    }`}
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  Previous
                </button>
                {currentStep === 3 ?
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={registerAD}
                  >
                    Submit
                  </button> :
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={nextStep}
                  >
                    Next
                  </button>}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ADRegistration
