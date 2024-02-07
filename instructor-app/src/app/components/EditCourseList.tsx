import { FaArrowLeft } from "react-icons/fa";

interface Student {
    studentName: string;
    studentId: string;
    sis: string;
    email: string;
    section: string;
}

interface EditCourseListProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  file: File | null;
  students: Student[]; // Add the students prop
}

export default function EditCourseList({ setStep, handleFileChange, file, students }: EditCourseListProps) {
    const downloadCSV = () => {
        const sanitizeValue = (value: string | undefined | null) => {
          if (value === undefined || value === null) {
            return '';  // Return an empty string for undefined or null values
          }
          return value
            .toString()  // Convert to string to handle unexpected types
            .replace(/%/g, '%25')  // Encode '%' as '%25'
            .replace(/\r/g, '')    // Remove carriage return
            .replace(/\n/g, '')    // Remove newline
            .replace(/,/g, '%2C'); // Encode ',' as '%2C'
        };
      
        // Define the headers in the desired order
        const headers = ["Student Name", "Student ID", "Student SIS ID", "Email", "Section Name"];
      
        // Define a mapping between headers and corresponding keys in the Student interface
        const headerToKeyMap: Record<string, keyof Student> = {
          "Student Name": "studentName",
          "Student ID": "studentId",
          "Student SIS ID": "sis",
          "Email": "email",
          "Section Name": "section",
        };
      
        // Create the header row
        const headerRow = headers.map(sanitizeValue).join(",");
      
        // Create the data rows
        const dataRows = students
          .map((student) => {
            const rowData = headers.map((header) => {
              const key = headerToKeyMap[header];
              const propertyValue = student[key];
              return sanitizeValue(propertyValue);
            });
            return rowData.join(",");
          })
          .join("\n");
      
        // Combine header and data rows
        const csvContent = `data:text/csv;charset=utf-8,${headerRow}\n${dataRows}`;
      
        // Trigger download
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "students.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
      
      
      

  
    return (
    <>
      <div className="card w-full bg-base-100 shadow-xl mt-16 py-6">
        <form className="card-body">
            <div className="flex flex-col md:flex-row justify-between items-baseline pb-4">
                <h2 className="card-title font-bold text-3xl mb-4 self-center">
                    <button onClick={() => setStep(0)}>
                        <FaArrowLeft />
                    </button>
                    Class List
                </h2>
            </div>
            <div className="md:px-16 flex flex-col gap-4">
                <ul className="steps">
                    <li className="step step-primary">Details</li>
                    <li className="step step-primary">Class List</li>
                    <li className="step">Confirm</li>
                </ul>

                <div className="form-control pt-6">
                    <p className="pb-4">
                        Import your class from Canvas with the instructions: Lorem ipsum
                        dolor sit amet consectetur adipisicing elit. Maiores laborum
                        ullam laboriosam dignissimos eaque harum nemo aperiam beatae
                        alias! Dolorum rem nihil et provident sed impedit eaque minus
                        odit similique!
                    </p>


                    {/* Iterate over the students array and display information */}
                    <div className="form-control pt-6">
                        <h3 className="text-lg font-semibold mb-2">Students:</h3>
                        <ul>
                        {students.map((student, index) => (
                            <li key={index}>
                            {`${index + 1}: ${student.studentName}, ${student.studentId}, ${student.email}, Section ${student.section}`}
                            </li>
                        ))}
                        </ul>
                    </div>
                    {/* Button to download CSV */}
                    <button
                        className="btn btn-primary w-28 mt-4"
                        onClick={(e) => {
                        e.preventDefault();
                        downloadCSV();
                        }}
                    >
                        Download Current Class List
                    </button>


                    <label className="label">
                        <span className="label-text">Upload class list (.csv)</span>
                        {file && <span className="label-text-alt">Selected file: {file.name}</span>}
                    </label>
                    <input
                        type="file"
                        className="file-input file-input-bordered file-input-primary w-full"
                        accept="text/csv"
                        onChange={(e) => {handleFileChange(e)}}
                    />
                </div>

                <div className="flex justify-between w-full mt-4">
                    <button
                        className="btn btn-primary w-28"
                        onClick={(e) => {
                            e.preventDefault();
                            setStep(0);
                        }}
                    >
                        Previous
                    </button>
                    <button
                        className="btn btn-primary w-28"
                        onClick={(e) => {
                            e.preventDefault();
                            setStep(2);
                        }}
                    >
                        Next
                    </button>
                </div>
            </div>
        </form>
      </div>
    </>
  );
}
