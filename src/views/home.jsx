import React, { Component } from "react";
class home extends Component {
  state = {
    titleSearch: "",
    categorySearch: "",
    progressSearch: "",
    checkbox: false,
    todo: [
      {
        id: "16345356",
        title: "Task 1",
        category: "Designer",
        isDone: false,
        isEdit: false
      },
      {
        id: "454242",
        title: "Task 2",
        category: "Front-end Engineer",
        isDone: true,
        isEdit: false
      },
      {
        id: "5354526",
        title: "Task 3",
        category: "Designer",
        isDone: false,
        isEdit: false
      },
      {
        id: "897846756",
        title: "Task 4",
        category: "Back-end Engineer",
        isDone: false,
        isEdit: false
      }
    ]
  };

  listItem() {
    let list = this.state.todo;
    let search = this.state.titleSearch.trim().toLowerCase();
    let categorySearch = this.state.categorySearch.trim().toLowerCase();
    let progressSearch = this.state.progressSearch.trim().toLowerCase();

    let classes =
      "list-group-item list-group-item-action flex-column align-items-start p-2 mb-2 ";

    // if (categorySearch.length > 0) {
    //   list.filter(item => {
    //     return item.category.toLowerCase().match(categorySearch);
    //   });
    // }
    // if (progressSearch.length > 0) {
    //   list.filter(item => {
    //     return item.isDone.toLowerCase().match(progressSearch);
    //   });
    // }

    if (search.length > 0) {
      list.filter(item => {
        return item.id === search;
      });
    }

    if (!list) {
      return null;
    }

    if (!list.length) {
      return <small>Sorry, the list is empty.</small>;
    } else {
      return list.map(item => (
        <div
          key={item.id}
          className={
            item.isDone === false ? classes + "" : classes + "bg-light"
          }
        >
          <div className="d-flex w-100 list-gorup-wrapper">
            {item.isEdit === false ? (
              // isEdit = False
              <div className="d-flex w-100 list-view">
                <span className="d-flex align-items-center input-check">
                  <input
                    type="checkbox"
                    name="checkbox"
                    key={item.id}
                    defaultChecked={item.isDone}
                    onChange={event => this.handleCheck(event, item.id)}
                  />
                </span>

                <div className="w-100 d-flex justify-content-between align-items-start">
                  <div className="d-flex justify-content-between align-items-start w-100 desc">
                    <h6 className="title mb-1">{item.title}</h6>
                    <span className="d-inline-flex">
                      <span className="badge badge-primary badge-pill">
                        {item.category}
                      </span>
                      {item.isDone === false ? (
                        ""
                      ) : (
                        <span className="badge badge-success badge-pill ml-1">
                          Done
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="d-flex flex-column justify-content-between" />
                </div>
              </div>
            ) : (
              // isEdit = True
              <form
                className="d-flex w-100 align-items-center list-edit"
                onSubmit={event => this.handleEdit(event, item.id)}
              >
                <div className="d-flex w-100">
                  <input
                    type="text"
                    className="w-100"
                    placeholder="What to do?"
                    name="title"
                    defaultValue={item.title}
                    onChange={this.handleInputChange}
                  />
                  <select
                    name="category"
                    defaultValue={item.category ? item.category : "Category"}
                    onChange={this.handleInputChange}
                  >
                    <option value="Category" disabled>
                      Category
                    </option>
                    <option value="Designer">Designer</option>
                    <option value="Back-end Engineer">Back-end Engineer</option>
                    <option value="Front-end Engineer">
                      Front-end Engineer
                    </option>
                  </select>
                </div>
                <button className="d-flex text-warning ml-1 action-add">
                  <i className="material-icons">add_box</i>
                </button>
              </form>
            )}
            <div className="actions">
              {item.isEdit === false ? (
                <a
                  className="text-muted mr-1"
                  onClick={event => this.handleChangeEdit(event, item.id)}
                >
                  <i className="material-icons" style={{ fontSize: 12 }}>
                    edit
                  </i>
                </a>
              ) : (
                ""
              )}
              <a
                className="text-danger"
                onClick={event => this.handleDelete(event, item.id)}
              >
                <i className="material-icons" style={{ fontSize: 13 }}>
                  close
                </i>
              </a>
            </div>
          </div>
        </div>
      ));
    }
  }

  handleInputChange = (event, Id) => {
    this.setState({
      id: Id,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value
    });
  };

  handleAdd = event => {
    event.preventDefault();
    const uuidv4 = require("uuid/v4");
    const uniqueId = uuidv4();

    let todo = [...this.state.todo];
    todo[this.state.todo.length++] = {
      id: uniqueId,
      title: this.state.title,
      category: this.state.category,
      isDone: false,
      isEdit: false
    };

    this.setState(prevState => ({ todo }));
  };

  handleCheck = (event, Id) => {
    this.setState({
      id: Id,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value
    });

    let todo = [...this.state.todo];
    let index = this.state.todo.findIndex(item => item.id === Id);
    todo[index] = {
      id: this.state.todo[index].id,
      title: this.state.todo[index].title,
      category: this.state.todo[index].category,
      isDone: !this.state.todo[index].isDone,
      isEdit: this.state.todo[index].isEdit
    };

    this.setState(prevState => ({ todo }));
  };

  handleChangeEdit = (event, Id) => {
    let todo = [...this.state.todo];
    let index = this.state.todo.findIndex(item => item.id === Id);
    todo[index] = {
      id: this.state.todo[index].id,
      title: this.state.title ? this.state.title : this.state.todo[index].title,
      category: this.state.category
        ? this.state.category
        : this.state.todo[index].category,
      isDone: !this.state.checkbox,
      isEdit: !this.state.todo[index].isEdit
    };

    this.setState(prevState => ({ todo }));
  };

  handleEdit = (event, Id) => {
    event.preventDefault();
    let todo = [...this.state.todo];
    let index = this.state.todo.findIndex(item => item.id === Id);
    todo[index] = {
      id: this.state.todo[index].id,
      title: this.state.title ? this.state.title : this.state.todo[index].title,
      category: this.state.category
        ? this.state.category
        : this.state.todo[index].category,
      isDone: !this.state.checkbox,
      isEdit: !this.state.todo[index].isEdit
    };

    this.setState(prevState => ({ todo }));
  };

  handleDelete = (event, Id) => {
    const todo = this.state.todo.filter(d => d.id !== Id);
    this.setState({ todo });
  };

  handleSearch = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container p-4">
          <div className="row">
            <div className="col-12 mb-4">
              <h6 className="text-black-50">TO DO LIST</h6>
              {/* CREATE */}
              <div className="list-group mb-3">
                <div className="list-group-item bg-dark p-2">
                  <form
                    action=""
                    className="d-flex align-items-center"
                    onSubmit={this.handleAdd}
                  >
                    <div className="d-flex w-100">
                      <input
                        type="text"
                        className="w-100"
                        placeholder="What to do?"
                        name="title"
                        onChange={this.handleInputChange}
                      />
                      <select
                        name="category"
                        defaultValue="Category"
                        onChange={this.handleInputChange}
                      >
                        <option value="Category" disabled>
                          Category
                        </option>
                        <option value="Designer">Designer</option>
                        <option value="Back-end Engineer">
                          Back-end Engineer
                        </option>
                        <option value="Front-end Engineer">
                          Front-end Engineer
                        </option>
                      </select>
                    </div>
                    <button className="d-flex text-warning ml-1 action-add">
                      <i className="material-icons">add_box</i>
                    </button>
                  </form>
                </div>
              </div>
              {/* SEARCH */}
              <form action="" className="pl-2 pr-2 search">
                <div className="input-group input-group-sm mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    aria-label="search"
                    aria-describedby="basic-addon1"
                    name="titleSearch"
                    onChange={this.handleSearch}
                  />
                  <select
                    name="categorySearch"
                    defaultValue="Category"
                    onChange={this.handleSearch}
                  >
                    <option value="Category" disabled>
                      Category
                    </option>
                    <option value="Designer">Designer</option>
                    <option value="Back-end Engineer">Back-end Engineer</option>
                    <option value="Front-end Engineer">
                      Front-end Engineer
                    </option>
                  </select>
                  <select
                    name="progressSearch"
                    defaultValue="Progress"
                    onChange={this.handleSearch}
                  >
                    <option value="Progress" disabled>
                      Progress
                    </option>
                    <option value="On Going">On Going</option>
                    <option value="Done">Done</option>
                  </select>
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="material-icons">search</i>
                    </span>
                  </div>
                </div>
              </form>
              <hr />
              {/* LIST TODO */}
              <div className="list-group pl-2 pr-2">
                {/* ON-GOING & DONE */}
                {this.listItem()}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default home;
