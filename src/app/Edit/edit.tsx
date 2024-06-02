import React, { ChangeEvent, useEffect, useState } from "react";
import useData from "../../hooks/useData";
import axios from "axios";

export default function EditPage() {
  const { user, token } = useData();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    balance: 0,
    rank: 0,
    verified: false,
    pBought: false,
    wType: 0,
    upi: "",
    bankName: "",
    accNo: "",
    ifsc: "",
  });

  useEffect(() => {
    setForm({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.number || "",
      password: user?.password || "",
      balance: user?.balance || 0,
      rank: user?.level || 0,
      verified: user?.verified || false,
      pBought: (user?.products.length == 0 ? false : true) || false,
      wType: user?.withdrawlType || 0,
      upi: user?.upi || "",
      bankName: user?.bank?.bank_name || "",
      accNo: user?.bank?.account_no || "",
      ifsc: user?.bank?.ifsc || "",
    });
  }, []);
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = event.target;
    if (name == "verified" || name == "pBought") {
      const { checked } = event.target as HTMLInputElement;
      setForm({ ...form, [name]: checked });
    } else {
      const { value } = event.target;
      setForm({ ...form, [name]: value });
    }
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    axios
      .put(
        `${import.meta.env.VITE_SERVER}/edit/details/${user?._id}`,
        { details: form },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {});
  }
  return (
    <div className="edit-page page">
      <h1>Edit Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="edit-items">
          <div className="edit-item">
            <p>Name</p>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
            />
          </div>
          <div className="edit-item">
            <p>Email</p>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div className="edit-item">
            <p>Ph No</p>
            <input
              type="number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone No"
            />
          </div>
          <div className="edit-item">
            <p>Pass</p>
            <input
              type="text"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
          <div className="edit-item">
            <p>Balance</p>
            <input
              type="number"
              name="balance"
              value={form.balance}
              onChange={handleChange}
              placeholder="Balance"
            />
          </div>
          <div className="edit-item">
            <p>Rank</p>
            <select name="rank" value={form.rank} onChange={handleChange}>
              <option value="0">0 : Aspiring Author</option>
              <option value="1">1 : Junior Associate</option>
              <option value="2">2 : Associate Manager</option>
              <option value="3">3 : Senior Associate</option>
              <option value="4">4 : Business Development Manger</option>
            </select>
          </div>
          <div className="edit-item two-items">
            <div>
              <p>Verified</p>
              <input
                type="checkbox"
                name="verified"
                checked={form.verified}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>P Bought</label>
              <input
                type="checkbox"
                name="pBought"
                checked={form.pBought}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="edit-item">
            <p>W type</p>
            <select name="wType" value={form.wType} onChange={handleChange}>
              <option value="0">0 : Not Selected</option>
              <option value="1">1 : Upi Transfer</option>
              <option value="2">2 : Bank Transfer</option>
            </select>
          </div>
          <div className="edit-item">
            <p>Upi</p>
            <input
              type="text"
              name="upi"
              value={form.upi}
              onChange={handleChange}
              placeholder="Upi"
            />
          </div>
          <div className="edit-item">
            <p>B Name</p>
            <input
              type="text"
              name="bankName"
              value={form.bankName}
              onChange={handleChange}
              placeholder="Bank Name"
            />
          </div>
          <div className="edit-item">
            <p>Acc No</p>
            <input
              type="text"
              name="accNo"
              value={form.accNo}
              onChange={handleChange}
              placeholder="Acc No"
            />
          </div>
          <div className="edit-item">
            <p>Ifcs</p>
            <input
              type="text"
              name="ifsc"
              value={form.ifsc}
              onChange={handleChange}
              placeholder="Bank IFSC"
            />
          </div>
        </div>
        <center>
          <button>Submit</button>
        </center>
      </form>
    </div>
  );
}
