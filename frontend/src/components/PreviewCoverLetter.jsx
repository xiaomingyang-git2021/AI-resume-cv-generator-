// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import html2pdf from "html2pdf.js";

// const PreviewCoverLetter = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const [coverLetterData, setCoverLetterData] = useState(null);

//   useEffect(() => {
//     const savedData = localStorage.getItem("coverLetterData");
//     console.log("Retrieved data from localStorage:", savedData);

//     if (savedData) {
//       try {
//         const parsedData = JSON.parse(savedData);
//         console.log("Parsed cover letter data:", parsedData);
//         setCoverLetterData(parsedData);
//       } catch (error) {
//         console.error("Error parsing cover letter data:", error);
//         navigate("/create-cover-letter");
//       }
//     } else {
//       console.log("No cover letter data found");
//       navigate("/create-cover-letter");
//     }
//   }, [navigate]);

//   const generatePDF = () => {
//     const element = document.getElementById("cover-letter-content");
//     const opt = {
//       margin: 1,
//       filename: "cover-letter.pdf",
//       image: { type: "jpeg", quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
//     };

//     html2pdf().set(opt).from(element).save();
//   };

//   // 添加这个 console.log 来检查数据
//   console.log("Rendering with data:", coverLetterData);

//   if (!coverLetterData) {
//     console.log("No data available, returning null");
//     return null;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="mb-6 flex justify-between items-center">
//         <h2 className="text-2xl font-bold">{t("preview_cover_letter")}</h2>
//         <div className="space-x-4">
//           <button
//             onClick={() => navigate("/create-cover-letter")}
//             className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
//           >
//             {t("edit")}
//           </button>
//           <button
//             onClick={generatePDF}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             {t("generate_pdf")}
//           </button>
//         </div>
//       </div>

//       <div
//         id="cover-letter-content"
//         className="bg-white p-8 rounded-lg shadow-lg text-gray-800" // 添加 text-gray-800
//       >
//         {/* 个人信息 */}
//         <div className="mb-8">
//           <div className="text-right mb-4">
//             <div className="text-gray-700">{coverLetterData.date}</div>
//           </div>
//           {(coverLetterData.fullName ||
//             coverLetterData.email ||
//             coverLetterData.phone ||
//             coverLetterData.address) && (
//             <div className="mb-6 text-gray-800">
//               {coverLetterData.fullName && (
//                 <div>{coverLetterData.fullName}</div>
//               )}
//               {coverLetterData.address && <div>{coverLetterData.address}</div>}
//               {coverLetterData.email && <div>{coverLetterData.email}</div>}
//               {coverLetterData.phone && <div>{coverLetterData.phone}</div>}
//             </div>
//           )}
//         </div>

//         {/* 收件人信息 */}
//         <div className="mb-8 text-gray-800">
//           {coverLetterData.hiringManager && (
//             <div>{coverLetterData.hiringManager}</div>
//           )}
//           <div>{coverLetterData.companyName}</div>
//           <div>{coverLetterData.companyAddress}</div>
//         </div>

//         {/* 正文 */}
//         <div className="mb-6 text-gray-800">
//           <p className="mb-4">
//             Dear {coverLetterData.hiringManager || "Hiring Manager"},
//           </p>

//           <p className="mb-4">
//             I am writing to express my strong interest in the{" "}
//             {coverLetterData.jobTitle} position at {coverLetterData.companyName}
//             , which I learned about through {coverLetterData.jobSource}.
//           </p>

//           <p className="mb-4">
//             With my background and skills, I believe I would be a valuable
//             addition to your team. I am particularly drawn to{" "}
//             {coverLetterData.companyName} because of its reputation for
//             excellence and innovation in the industry.
//           </p>

//           <p className="mb-4">
//             I look forward to discussing how my skills and experiences align
//             with your needs for the {coverLetterData.jobTitle} position. Thank
//             you for considering my application.
//           </p>

//           <p className="mb-8">Sincerely,</p>

//           <div>{coverLetterData.fullName || "Applicant Name"}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PreviewCoverLetter;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import html2pdf from "html2pdf.js";

const PreviewCoverLetter = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [coverLetterData, setCoverLetterData] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("coverLetterData");
    console.log("Retrieved data from localStorage:", savedData);

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        console.log("Parsed cover letter data:", parsedData);
        setCoverLetterData(parsedData);
      } catch (error) {
        console.error("Error parsing cover letter data:", error);
        navigate("/create-cover-letter");
      }
    } else {
      console.log("No cover letter data found");
      navigate("/create-cover-letter");
    }
  }, [navigate]);

  const generatePDF = () => {
    const element = document.getElementById("cover-letter-content");
    const opt = {
      margin: 1,
      filename: "cover-letter.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  if (!coverLetterData) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t("preview_cover_letter")}</h2>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/create-cover-letter")}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
          >
            {t("edit")}
          </button>
          <button
            onClick={generatePDF}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {t("generate_pdf")}
          </button>
        </div>
      </div>

      <div
        id="cover-letter-content"
        className="bg-white p-8 rounded-lg shadow-lg text-gray-800 w-full min-h-[800px] text-left"
      >
        {/* 个人信息 */}
        <div className="mb-8">
          <div className="mb-6">
            <div className="text-gray-800">
              {coverLetterData.fullName || "Your Name"}
            </div>
            {/* <div className="text-gray-800">
              {coverLetterData.address || "Your Address"}
            </div> */}
            <div className="text-gray-800">
              {coverLetterData.email || "Your Email"}
            </div>
            <div className="text-gray-800">
              {coverLetterData.phone || "Your Phone"}
            </div>
          </div>
        </div>

        <div className="text-left text-gray-700 mb-4">
          <div className="text-gray-700">{coverLetterData.date}</div>
        </div>

        {/* 收件人信息 */}
        <div className="mb-8">
          <div className="text-gray-800">{coverLetterData.hiringManager}</div>
          <div className="text-gray-800">{coverLetterData.companyName}</div>
          <div className="text-gray-800">{coverLetterData.companyAddress}</div>
        </div>

        {/* 正文 */}
        <div className="mb-6">
          <p className="mb-4 text-gray-800">
            Dear {coverLetterData.hiringManager || "Hiring Manager"},
          </p>

          <p className="mb-4 text-gray-800">
            I am writing to express my strong interest in the{" "}
            {coverLetterData.jobTitle} position at {coverLetterData.companyName}
            , which I learned about through {coverLetterData.jobSource}.
          </p>

          <p className="mb-4 text-gray-800">
            With my background and skills, I believe I would be a valuable
            addition to your team. I am particularly drawn to{" "}
            {coverLetterData.companyName} because of its reputation for
            excellence and innovation in the industry.
          </p>

          <p className="mb-4 text-gray-800">
            I look forward to discussing how my skills and experiences align
            with your needs for the {coverLetterData.jobTitle} position. Thank
            you for considering my application.
          </p>

          <p className="mb-8 text-gray-800">Sincerely,</p>

          <div className="text-gray-800">
            {coverLetterData.fullName || "Applicant Name"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewCoverLetter;
