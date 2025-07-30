import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import { useEffect } from "react";

const DoctorProfile = () => {
  const { docData, setDocData, dToken, backendUrl, loadDoctorProfileData } =
    useContext(DoctorContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", docData.name);
      formData.append("address", JSON.stringify(docData.address));
      formData.append("speciality", docData.speciality);
      formData.append("degree", docData.degree);
      formData.append("experience", docData.experience);
      formData.append("about", docData.about);
      formData.append("fees", docData.fees);
      formData.append("available", docData.available);

      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        { formData },
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadDoctorProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (dToken) loadDoctorProfileData();
  }, [dToken]);

  return (
    docData && (
      <div className="flex flex-col pt-4 border border-t-0 border-gray-300 bg-white m-5 p-5 w-2xl">
        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img
                className="w-36 rounded opacity-75"
                src={image ? URL.createObjectURL(image) : docData.image}
              />
              <img
                className="w-10 absolute bottom-12 right-12"
                src={image ? "" : assets.upload_icon}
              />
            </div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img className=" w-36 rounded" src={docData.image} />
        )}

        {isEdit ? (
          <input
            className=" bg-gray-50 text-3xl font-medium max-w-60 mt-4"
            type="text"
            value={docData.name}
            onChangeCapture={(e) =>
              setDocData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className=" font-medium text-3xl text-neutral-800 mt-4">
            {docData.name}
          </p>
        )}

        <hr className=" bg-zinc-400 h-[1px] border-none" />

        <div>
          <p className=" text-neutral-500 underline mt-3">Contact Info</p>
          <div className=" grid  grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className=" font-medium">Email id:</p>
            <p className=" text-blue-500">{docData.email}</p>

            <p className=" font-medium">Address:</p>

            {isEdit ? (
              <p>
                <input
                  className="bg-gray-50"
                  value={docData.address?.line1 || ""}
                  onChangeCapture={(e) =>
                    setDocData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  type="text"
                />
                <br />
                <input
                  className="bg-gray-50"
                  value={docData.address?.line2 || ""}
                  onChangeCapture={(e) =>
                    setDocData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  type="text"
                />
              </p>
            ) : (
              <p className="text-gray-500">
                {docData.address?.line1}
                <br />
                {docData.address?.line2}
              </p>
            )}
          </div>
        </div>
        <div>
          <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
          <div className=" grid  grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className=" font-medium">Speciality:</p>
            {isEdit ? (
              <select
                className=" max-w-20 bg-gray-100"
                value={docData.speciality}
                onChangeCapture={(e) =>
                  setDocData((prev) => ({
                    ...prev,
                    spreciality: e.target.value,
                  }))
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className=" text-gray-400">{docData.speciality}</p>
            )}
            <p className=" font-medium">Degree:</p>
            {isEdit ? (
              <input
                className=" max-w-28 bg-gray-100"
                type="text"
                value={docData.degree}
                onChangeCapture={(e) =>
                  setDocData((prev) => ({
                    ...prev,
                    degree: e.target.value,
                  }))
                }
              />
            ) : (
              <p className=" text-gray-400">{docData.degree}</p>
            )}
            <p className=" font-medium">Experience:</p>
            {isEdit ? (
              <input
                className=" max-w-28 bg-gray-100"
                type="text"
                value={docData.experience}
                onChangeCapture={(e) =>
                  setDocData((prev) => ({
                    ...prev,
                    experience: e.target.value,
                  }))
                }
              />
            ) : (
              <p className=" text-gray-400">{docData.experience}</p>
            )}
            <p className=" font-medium">About:</p>
            {isEdit ? (
              <textarea
                className=" h-fit bg-gray-100"
                value={docData.about}
                onChangeCapture={(e) =>
                  setDocData((prev) => ({
                    ...prev,
                    about: e.target.value,
                  }))
                }
              />
            ) : (
              <p className=" text-gray-400">{docData.about}</p>
            )}
            <p className=" font-medium">Available:</p>
            {isEdit ? (
              <input
                className=" max-w-28 bg-gray-100"
                type="checkbox"
                value={docData.available}
                onChangeCapture={(e) =>
                  setDocData((prev) => ({
                    ...prev,
                    available: e.target.value,
                  }))
                }
              />
            ) : docData.available ? (
              <p className=" text-gray-400">Available</p>
            ) : (
              <p className=" text-gray-400">Not Available</p>
            )}

            <p className=" font-medium">Fees:</p>
            {isEdit ? (
              <input
                className=" max-w-28 bg-gray-100"
                type="number"
                value={docData.fees}
                onChangeCapture={(e) =>
                  setDocData((prev) => ({
                    ...prev,
                    fees: e.target.value,
                  }))
                }
              />
            ) : (
              <p className=" text-gray-400">${docData.fees}</p>
            )}
          </div>
        </div>

        <div className=" mt-10">
          {isEdit ? (
            <button
              cla
              className=" cursor-pointer border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
              onClick={updateProfile}
            >
              Save Information
            </button>
          ) : (
            <button
              className=" cursor-pointer border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
