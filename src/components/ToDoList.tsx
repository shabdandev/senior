import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  _id?: number;
  image: string;
  firstName: string;
  lastName: string;
  age: number | string;
  email: string;
}

const ToDoList = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const [user, setUser] = useState<IFormInput[]>([]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const newData = {
      image: data.image,
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      email: data.email,
    };
    const { data: responseData } = await axios.post(
      "https://api.elchocrud.pro/api/v1/ccad5eabd49b07d78f36daa17a4c03e0/motion",
      newData
    );
    setUser(responseData);
    console.log("🚀 ~ ToDoList ~ data:", data);
  };

  const getProduct = async () => {
    const { data } = await axios.get(
      "https://api.elchocrud.pro/api/v1/ccad5eabd49b07d78f36daa17a4c03e0/motion"
    );
    setUser(data);
    console.log("🚀 ~ getProduct ~ data:", data);
  };

  const deleteProduct = async (_id: number) => {
    const { data } = await axios.delete(
      `https://api.elchocrud.pro/api/v1/ccad5eabd49b07d78f36daa17a4c03e0/motion/${_id}`
    );
    setUser(data);
    console.log("🚀 ~ getProduct ~ data:", data);
  };
  const [search, setSearch] = useState("");
  const [edit, setEdit] = useState(false);
  const [editValues, setEditValues] = useState({
    image: "",
    firstName: "",
    lastName: "",
    age: 0,
    email: "",
    _id: +"",
  });

  const editProduct = async () => {
    const newData = {
      image: editValues.image,
      firstName: editValues.firstName,
      lastName: editValues.lastName,
      age: editValues.age,
      email: editValues.email,
    };

    const { data } = await axios.patch(
      `https://api.elchocrud.pro/api/v1/ccad5eabd49b07d78f36daa17a4c03e0/motion/${editValues._id}`,
      newData
    );
    setUser(data);
    setEditValues({
      image: "",
      lastName: "",
      firstName: "",
      age: 0,
      email: "",
      _id: editValues._id,
    });
    setEdit(false);
  };

  useEffect(() => {
    getProduct();
  }, [search]);

  return (
    <>
      <div className="search">
        <input
          type="text"
          placeholder="search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="cl">
        <form className="cll" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="image"
            {...register("image", { required: true })}
            onChange={(e) =>
              setEditValues({ ...editValues, image: e.target.value })
            }
            value={editValues.image}
          />
          <input
            type="text"
            placeholder="lastName"
            {...register("lastName", { required: true })}
            onChange={(e) =>
              setEditValues({ ...editValues, lastName: e.target.value })
            }
            value={editValues.lastName}
          />
          <input
            type="text"
            placeholder="firstName"
            {...register("firstName", { required: true })}
            onChange={(e) =>
              setEditValues({ ...editValues, firstName: e.target.value })
            }
            value={editValues.firstName}
          />
          <input
            type="number"
            placeholder="age"
            {...register("age", { required: true })}
            onChange={(e) =>
              setEditValues({ ...editValues, age: +e.target.value })
            }
            value={editValues.age}
          />
          <input
            type="text"
            placeholder="email"
            {...register("email", { required: true })}
            onChange={(e) =>
              setEditValues({ ...editValues, email: e.target.value })
            }
            value={editValues.email}
          />
          {!edit ? (
            <button type="submit">SAVE</button>
          ) : (
            <button onClick={editProduct}>Edit</button>
          )}
        </form>
        <div className="hh">
          {user
            .filter((el) =>
              el.lastName
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase())
            )
            .map((el) => (
              <div className="jj">
                <img width={300} src={el.image} alt="Motion" />
                <h2>{el.firstName}</h2>
                <h3>{el.lastName}</h3>
                <h3>{el.age}</h3>
                <h3>{el.email}</h3>
                <div className="action">
                  <button
                    className="del-btn"
                    onClick={() => deleteProduct(el._id!)}
                  >
                    delete
                  </button>
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEdit(true);
                      setEditValues({
                        image: el.image,
                        firstName: el.firstName,
                        lastName: el.lastName,
                        age: +el.age!,
                        email: el.email,
                        _id: el._id!,
                      });
                    }}
                  >
                    edit
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ToDoList;
