import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import {
  fetchGroup,
  createNewUser,
  updateCurrentUser,
} from "../../services/userService";
import { toast } from "react-toastify";
import _ from "lodash";

const ModalUser = (props) => {
  const { action, dataModalUser } = props;

  const defaultUserData = {
    email: "",
    phone: "",
    username: "",
    password: "",
    address: "",
    sex: "",
    group: "",
  };

  const validInputsDefault = {
    email: true,
    phone: true,
    username: true,
    password: true,
    address: true,
    sex: true,
    group: true,
  };

  const [userData, setUserData] = useState(defaultUserData);
  //Chỉ có thể thao tác với userData thông qua setUserData vì đã khai báo const.
  const [validInputs, setValidInputs] = useState(validInputsDefault);
  const [userGroups, setUserGroup] = useState([]);

  useEffect(() => {
    getGroups();
  }, []);

  useEffect(() => {
    if (action === "UPDATE") {
      console.log(">>> check data update: ", dataModalUser);
      console.log(">>> check data update 2: ", {
        ...dataModalUser,
        group: dataModalUser.Group ? dataModalUser.Group.id : "",
      });

      setUserData({
        ...dataModalUser,
        group: dataModalUser.Group ? dataModalUser.Group.id : "",
      });
    }
  }, [dataModalUser]);

  useEffect(() => {
    if (action === "CREATE") {
      if (userGroups && userGroups.length > 0) {
        setUserData({ ...userData, group: userGroups[0].id });
      }
    }
  }, [action]);

  const getGroups = async () => {
    let res = await fetchGroup();
    if (res && res.EC === 0) {
      setUserGroup(res.DT);
      if (res.DT && res.DT.length > 0) {
        let groups = res.DT;
        setUserData({ ...userData, group: groups[0].id });
      }
    } else {
      toast.error(res.EM);
    }
  };

  const handleOnchangeInput = (value, name) => {
    //Giá trị và input muốn set
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };

  const checkValidateInputs = () => {
    //create user
    if (action === "UPDATE") return true;
    //Block Validate khi Update

    setValidInputs(validInputsDefault);
    // console.log(">>> check userData: ", userData)
    let arr = ["email", "phone", "password", "group"];
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs[arr[i]] = false;
        setValidInputs(_validInputs);

        toast.error(`Empty Input ${arr[i]}`);
        check = false;
        break;
      }
    }

    return check;
  };

  const handleConfirmUser = async () => {
    //Create User
    let check = checkValidateInputs();
    if (check === true) {
      let res =
        action === "CREATE"
          ? await createNewUser({
              ...userData,
              groupId: userData["group"],
            })
          : await updateCurrentUser({
              ...userData,
              groupId: userData["group"],
            });
      // console.log(">>> check res: ", res);
      if (res.EC === 0) {
        props.onHide();
        setUserData({ ...defaultUserData, 
          group: userGroups && userGroups.length > 0 ? userGroups[0].id : ''
        });
      }
      if (res.EC !== 0) {
        toast.error(res.EM);
        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs[res.DT] = false;
        setValidInputs(_validInputs);
      }
    }
  };

  const handleCloseModalUser = () => {
    props.onHide();
    setUserData(defaultUserData);
    setValidInputs(validInputsDefault);
  };

  return (
    <>
      <Modal
        size="lg"
        show={props.show}
        className="modal-user"
        onHide={() => handleCloseModalUser()}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <span>
              {props.action === "CREATE" ? "Create new user" : "Edit this user"}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 from-group">
              <label>
                Email (<span className="color">*</span>) :
              </label>
              <input
                disabled={action === "CREATE" ? false : true}
                className={
                  validInputs.email ? "form-control" : "form-control is-invalid"
                }
                type="email"
                value={userData.email}
                onChange={(event) =>
                  handleOnchangeInput(event.target.value, "email")
                }
              />
            </div>
            <div className="col-12 col-sm-6 from-group">
              <label>
                Phone Number (<span className="color">*</span>) :
              </label>
              <input
                disabled={action === "CREATE" ? false : true}
                className={
                  validInputs.phone ? "form-control" : "form-control is-invalid"
                }
                type="text"
                value={userData.phone}
                onChange={(event) =>
                  handleOnchangeInput(event.target.value, "phone")
                }
              />
            </div>
            <div className="col-12 col-sm-6 from-group">
              <label>Username :</label>
              <input
                className="form-control"
                type="text"
                value={userData.username}
                onChange={(event) =>
                  handleOnchangeInput(event.target.value, "username")
                }
              />
            </div>

            <div className="col-12 col-sm-6 from-group">
              {action === "CREATE" && (
                <>
                  <label>
                    Password (<span className="color">*</span>) :
                  </label>
                  <input
                    className={
                      validInputs.password
                        ? "form-control"
                        : "form-control is-invalid"
                    }
                    type="text"
                    value={userData.password}
                    onChange={(event) =>
                      handleOnchangeInput(event.target.value, "password")
                    }
                  />
                </>
              )}
            </div>

            <div className="col-12 col-sm-12 from-group">
              <label>Address :</label>
              <input
                className="form-control"
                type="text"
                value={userData.address}
                onChange={(event) =>
                  handleOnchangeInput(event.target.value, "address")
                }
              />
            </div>
            <div className="col-12 col-sm-6 from-group">
              <label>Gender :</label>
              <select
                className="form-select"
                onChange={(event) =>
                  handleOnchangeInput(event.target.value, "sex")
                }
                value={userData.sex}
              >
                <option defaultValue="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-12 col-sm-6 from-group">
              <label>
                Group (<span className="color">*</span>) :
              </label>
              <select
                className={
                  validInputs.group ? "form-select" : "form-select is-invalid"
                }
                onChange={(event) =>
                  handleOnchangeInput(event.target.value, "group")
                }
                value={userData.group}
              >
                {userGroups.length > 0 &&
                  userGroups.map((item, index) => {
                    return (
                      <option key={`group-${index}`} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModalUser()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirmUser()}>
            {action === "CREATE" ? "Save" : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
