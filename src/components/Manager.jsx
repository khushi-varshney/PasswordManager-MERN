import { useEffect, useRef, useState } from "react";
import { FaCopy } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () =>{
    let req = await fetch("http://localhost:3000/")
    let passwords =await req.json();
      setPasswordArray(passwords);
      console.log(passwords)
  }

  useEffect(() => {
    getPasswords()
  }, []);

  const copyText = (text) => {
    toast("Copied To Clipboard !", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      await fetch("http://localhost:3000/", {method: "DELETE", headers: { "Content-Type" : "application/json"}, body: JSON.stringify({ id : form.id})})

      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      await fetch("http://localhost:3000/", {method: "POST", headers: { "Content-Type" : "application/json"}, body: JSON.stringify({...form, id: uuidv4()})})
      
      setForm({ site: "", username: "", password: "" });
      toast("Password Saved Successfully !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }else{
      toast("Provide valid inputs !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const deletePassword = async(id) => {
    let c = confirm("Do you really wants to delete this password ?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      let res = await fetch("http://localhost:3000/", {method: "DELETE", headers: { "Content-Type" : "application/json"}, body: JSON.stringify({ id})})
      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify(passwordArray.filter((item) => item.id !== id))
      // );
    }
    toast("Password Deleted !", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const editPassword = async(id) => {
    let co = confirm("Edit the Password ?");
    if (co) {
      setForm({...passwordArray.filter((i) => i.id === id)[0], id: id});
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      await fetch("http://localhost:3000/", {method: "DELETE", headers: { "Content-Type" : "application/json"}, body: JSON.stringify({ id : form.id})})

    }
  };

  const showPassword = () => {
    passwordRef.current.type = "text";
    if (
      ref.current.innerHTML ===
      `<lord-icon src="https://cdn.lordicon.com/zpwnkfbk.json" trigger="hover" stroke="bold" colors="primary:#121331,secondary:#320a5c" style="width: 24px; height: 24px;"></lord-icon>`
    ) {
      ref.current.innerHTML = `<lord-icon src="https://cdn.lordicon.com/zpwnkfbk.json" trigger="hover" state="hover-cross" stroke="bold" colors="primary:#121331,secondary:#320a5c" style="width: 24px; height: 24px;"></lord-icon>`;
      passwordRef.current.type = "text";
    } else {
      ref.current.innerHTML = `<lord-icon src="https://cdn.lordicon.com/zpwnkfbk.json" trigger="hover" stroke="bold" colors="primary:#121331,secondary:#320a5c" style="width: 24px; height: 24px;"></lord-icon>`;
      passwordRef.current.type = "password";
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>

      <div className="md:mycontainer w-fit mx-auto px-1 rounded-lg">
        <h1 className="text-center text-red-700 m-3 p-1 font-serif decoration-dashed underline underline-offset-4 font-extrabold md:text-[2rem] text-[5vw]">
          &#128274; Password Pro &#128273;
        </h1>
        <div className="text-black flex flex-col p-4">
          <input
            onChange={handleChange}
            value={form.site}
            name="site"
            type="text"
            className="border-[3px] border-green-700 rounded-xl md:p-1 p-[0.7vw] text-lg pl-3 text-white bg-black"
            placeholder="Enter Website URL"
          />
          <div className="flex justify-center md:flex-row flex-col items-center">
            <input
              value={form.username}
              onChange={handleChange}
              name="username"
              className="m-3 md:p-1 border-[3px] border-green-700  rounded-xl p-[0.1vw] text-lg text-black pl-3 "
              type="text"
              placeholder="Enter Username"
            />
            <div className="relative">
              <input
                value={form.password}
                name="password"
                onChange={handleChange}
                className=" border-[3px] m-3 md:p-1 border-green-700 rounded-xl p-[0.1vw] text-lg text-black pl-3"
                type="password"
                ref={passwordRef}
                placeholder="Enter Password"
              />

              <button
                ref={ref}
                className=" absolute top-5 cursor-pointer right-5"
                onClick={showPassword}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/zpwnkfbk.json"
                  trigger="hover"
                  stroke="bold"
                  style={{ width: "24px", height: "24px" }}
                  colors="primary:#121331,secondary:#320a5c"
                ></lord-icon>
              </button>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="hover:border-[2px] border-[1px] w-fit p-1 self-center flex justify-center items-center gap-1 border-green-600 rounded-lg text-[1.27rem] font-semibold text-pink-800 hover:text-pink-700 hover:text-[1.30rem] hover:bg-blue-100"
          >
            <lord-icon
              src="https://cdn.lordicon.com/zrkkrrpl.json"
              trigger="hover"
              stroke="bold"
              state="hover-swirl"
              colors="primary:#320a5c,secondary:#08a88a"
            ></lord-icon>
            Add Password
          </button>
        </div>
        <div className="passwords">
          <p className="text-center text-xl font-bold pb-4 pt-1 underline">
            Your Passwords
          </p>
          {passwordArray.length === 0 && (
            <div className="text-center py-2 my-2 outline-dashed text-3xl">
              No Passwords To Show
            </div>
          )}
          {passwordArray.length != 0 && (
            <div className="mb-20">
              <table className="table-auto w-full text-center rounded-xl">
                <thead className="bg-blue-200 text-black text-center">
                  <tr>
                    <th className="text-center py-1 px-2">Website</th>
                    <th className="text-center py-1 px-2">Username</th>
                    <th className="text-center py-1 px-2">Passwords</th>
                    <th className="text-center py-1 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-blue-50">
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="flex item-center justify-center text-center w-full p-2 gap-[9px] py-1">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <FaCopy
                            onClick={() => {
                              copyText(item.site);
                            }}
                            size={20}
                            className="cursor-pointer"
                          />
                        </td>
                        <td className="text-center px-1 py-1">
                          <div className="flex items-center justify-center gap-2">
                            <p>{item.username}</p>
                            <FaCopy
                              size={20}
                              onClick={() => {
                                copyText(item.username);
                              }}
                              className="cursor-pointer"
                            />
                          </div>
                        </td>
                        <td className="text-center px-1 py-1">
                          <div className="flex items-center justify-center gap-2">
                            <p>{"*".repeat(item.password.length)}</p>
                            <FaCopy
                              size={20}
                              onClick={() => {
                                copyText(item.password);
                              }}
                              className="cursor-pointer"
                            />
                          </div>
                        </td>
                        <td className="text-center px-1 py-1">
                          <div className="flex items-center justify-center gap-3">
                            <lord-icon
                              src="https://cdn.lordicon.com/drxwpfop.json"
                              trigger="hover"
                              onClick={() => {
                                deletePassword(item.id);
                              }}
                              stroke="bold"
                              className="cursor-pointer"
                              colors="primary:#e83a30,secondary:#911710"
                              style={{ width: "30px", height: "29px" }}
                            ></lord-icon>
                            <lord-icon
                              src="https://cdn.lordicon.com/wuvorxbv.json"
                              trigger="hover"
                              onClick={() => {
                                editPassword(item.id);
                              }}
                              stroke="bold"
                              className="cursor-pointer"
                              colors="primary:#109121,secondary:#109121"
                              style={{ width: "33px", height: "33px" }}
                            ></lord-icon>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
