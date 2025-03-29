import React, { useEffect, useState } from "react";

const UserPage = () => {
  const [data, setData] = useState([]);
  const [page1, setPage1] = useState([]);
  const [page2, setPage2] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [edit, setEdit] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({ first_name: '', last_name: '', email: "" });
  const [Icon, setIcon] = useState(true);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch("https://reqres.in/api/users?page=1");
        const result = await response.json();
        setData(result.data);
        setPage1(result.data);
      } catch (err) {
        console.log("Failed to load Articles " + err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    setLoading(true);
    const fetchData2 = async () => {
      try {
        const response2 = await fetch("https://reqres.in/api/users?page=2");
        const result2 = await response2.json();
        setPage2(result2.data);
      } catch (err) {
        console.log("Failed to load Articles " + err);
      } finally {
        setLoading(false);
      }
    };

    fetchData2();
  }, []);
  const Page2Data = (e) => {
    e.preventDefault();
    setData([...page2]);
  };
  const Page1Data = (e) => {
    e.preventDefault();
    setData([...page1]);
  };
  const deleteUser = async (id, e) => {
    setLoading(true);
    e.preventDefault();
    const response = await fetch(`https://reqres.in/api/users/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setData(data.filter((user) => user.id !== id));
      alert("User deleted successfully!");
    } else {
      alert("Failed to delete user!");
    }
    setLoading(false);
  };
  const Logout = (e) => {
    localStorage.setItem("token", null);
    localStorage.setItem("user", null);
  };
  const EditVisible = (e) => {
    e.preventDefault();
    edit ? setEdit(false) : setEdit(true)
  };
  const handleEdit = (user) => {
    setEditUser(user.id);
    console.log(user);
    setEditUser(user.id);
    setFormData({ first_name: user.first_name, last_name: user.last_name, email: user.email });
  };
  const handleChange = (e) => {
    setLoading(true)
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value, 
    }));
  };
  const handleUpdate = async () => {
    if (!editUser) return;

    const response = await fetch(`https://reqres.in/api/users/${editUser}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ first_name: formData.first_name, last_name: formData.last_name, email: formData.email }),
    });

    if (response.ok) {
      alert("User updated successfully!");
      setData(
        data.map((user) =>
          user.id === editUser ? { ...user, first_name: formData.first_name, last_name: formData.last_name, email: formData.email } : user
        )
      );
      setEditUser(null); // Close edit form
    } else {
      alert("Failed to update user!");
    }
    setLoading(false)
  };

  return (
    <div className="md:h-screen h-max w-screen bg-[#F1F3F6] md:overflow-hidden overflow-x-hidden relative">
      {loading && (
        <div className="text-white flex justify-center items-center  text-[10vw] font-bold absolute h-screen w-screen bg-[#FD7401] z-10">
          Loading...
        </div>
      )}
      <div className="flex justify-between px-10 py-10 items-center">
        <h1 className="font-bold text-5xl">Users</h1>
        <a
          href=""
          onClick={(e) => {
            Logout(e);
          }}
          className="text-red-600 hover:underline"
        >
          Logout
        </a>
      </div>

      <div className="md:h-120  mx-3 flex md:flex-row flex-col drop-shadow-2xl">
        {data.map((ele, idx) => (
          <div
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            key={idx}
            className="relative bg-[#FD7401] md:h-100 md:w-100 rounded-sm p-4 md:my-0 my-2 flex flex-col justify-center text-white hover:bg-white hover:text-[#FD7401] hover:border-3 transition-all duration-300 hover:w-150"
          >
            <div className="flex justify-center">
              {hoveredIndex === idx && (
                <div className="absolute top-2 right-1">
                  <a key={idx}
                    onClick={(e) => {
                      EditVisible(e)
                      handleEdit(ele)
                    }}
                
                    onTouchStart={(e)=>{
                      EditVisible(e)
                      handleEdit(ele)
                    }}
                    className="m-2 font-semibold cursor-pointer hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    onClick={(e) => deleteUser(ele.id, e)}
                    className="m-2 right-10 font-semibold cursor-pointer hover:underline"
                  >
                    Delete
                  </a>
                </div>
              )}
              <img
                src={ele.avatar}
                alt=""
                className="rounded-full h-40 w-40 mt-10"
              />
            </div>
            <div className=" py-5 text-center">
              <h6 className="font-bold">
                Name: {ele.first_name} {ele.last_name}{" "}
              </h6>
              <p className="opacity-70 font-">{ele.email}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-3 md:m-0 m-10">
        <p className="">Page</p>
        <a
          onClick={(e) => {
            Page1Data(e);
          }}
          className=" border-1 border-[#FD7401] py-1 px-4 text-[#FD7401] rounded-lg hover:bg-[#FD7401] hover:text-white transition-all duration-200"
          href=""
        >
          1
        </a>
        <a
          onClick={(e) => {
            Page2Data(e);
          }}
          className=" border-1 border-[#FD7401] py-1 px-4 text-[#FD7401] rounded-lg hover:bg-[#FD7401] hover:text-white transition-all duration-200"
          href=""
        >
          2
        </a>
      </div>
      {edit && (
        <div className="fixed h-1/2 z-[50] w-full flex justify-center items-center top-30 ">
          <form
            action=""
            className="relative w-[90%] md:w-[60vw] h-max text-white shadow-2xl backdrop-blur-xl flex flex-col gap-y-2 border-1 rounded-2xl pt-10"
          >
            <div className="md:flex  justify-between md:px-20 px-8 ">
              <div>
                <h6 className="font-semibold">first name</h6>
                <input
                  required
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter first name"
                  className="w-50"
                />
              </div>
              <div>
                <h6 className="font-semibold">Last name</h6>
                <input
                  required
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter last name"
                  className=" w-50"
                />
              </div>
              <div>
                <h6 className="font-semibold">Email</h6>
                <input
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter Date"
                  className="w-50"
                />
              </div>
            </div>
            <div className="md:px-20 px-8">
            </div>
            <div className="flex justify-center">
              <a
                href=""
                className="text-xl rounded-xl text-white bg-[#FD7401] font-bold p-2 md:pb-2 md:mb-2 hover:bg-white hover:text-[#A58EFF] duration-500 transition-all shadow-xl"
                onClick={(e) => {
                  EditVisible(e);
                  handleUpdate(e)
                }}
              >
                Update
              </a>
            </div>
            <a
              onClick={(e) => {
                EditVisible(e);
                setEditUser(null)
              }}
              className="absolute top-5 right-10 text-2xl"
              href=""
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </a>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserPage;
