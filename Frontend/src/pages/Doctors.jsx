import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState(doctors);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedSpeciality, setSelectedSpeciality] = useState(null); // Track the selected speciality

  const handleSpecialityClick = (speciality) => {
    // Check if the clicked speciality is already selected
    if (selectedSpeciality === speciality) {
      // If clicked again, reset to show all doctors
      setFilterDoc(doctors);
      setSelectedSpeciality(null);
    } else {
      // Filter doctors based on the selected speciality
      const filtered = doctors.filter(
        (doc) => doc.speciality.toLowerCase() === speciality.toLowerCase()
      );
      setFilterDoc(filtered);
      setSelectedSpeciality(speciality); // Set the new selected speciality
    }
  };

  return (
    <div className="flex flex-col md:flex-row px-4">
      {/* Specialities Section */}
      <div className="w-full md:w-1/4 pr-4 mb-6 md:mb-0">
        <p className="text-gray-600 mb-4 text-lg">Specialities</p>
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>
        <div className={`flex flex-col gap-2 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          {[
            "General Physician",
            "Gynecologist",
            "Dermatologist",
            "Pediatricians",
            "Neurologist",
            "Gastroenterologist",
          ].map((spec, index) => (
            <p
              key={index}
              className="py-2 px-3 text-sm border border-gray-300 rounded transition-all cursor-pointer hover:bg-gray-100"
              onClick={() => handleSpecialityClick(spec)}
            >
              {spec}
            </p>
          ))}
        </div>
      </div>

      {/* Doctors Section */}
      <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filterDoc.length > 0 ? (
          filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              key={index}
              className="border border-gray-300 rounded overflow-hidden cursor-pointer hover:shadow-md transition-all"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-auto object-contain"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-green-500 font-semibold mb-2">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Available</p>
                </div>
                <p className="text-lg font-bold text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-600">{item.speciality}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No doctors found for this speciality.</p>
        )}
      </div>
    </div>
  );
};

export default Doctors;
