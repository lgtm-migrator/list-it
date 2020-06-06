import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { deleteList, updateList, getList } from "../../API";
import ListStyle from "./ListStyle";
import ListFooter from "./ListFooter";
import ListHeader from "./ListHeader";
import ListBody from "./ListBody";
import ListDropdown from "./ListDropdown/ListDropdown";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveringList: false,
      //State vars for dropdown rendering
      hoveringDropDown: false,
      hoveringFooterButton: false,
      typeOfDropdown: null,
      //State vars for list properties
      color: this.props.color,
      title: this.props.title,
      listItems: this.props.listItems,
      theme: this.props.theme,
      tags: this.props.tags,
      listStyle: new ListStyle(this.props.color, this.props.theme),
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.theme !== prevState.theme) {
      var newTheme = {
        theme: nextProps.theme,
        listStyle: new ListStyle(prevState.color, nextProps.theme),
      };
    }
    return newTheme ? { ...newTheme } : null;
  }

  deleteList = () => {
    deleteList(
      (response) => {
        this.props.refresh();
      },
      (error) => {
        console.log(error.response);
      },
      { id: this.props.id }
    );
  };

  updateList = (properties, callback = null) => {
    if (properties.color != null) {
      this.setState({
        listStyle: this.state.listStyle.setNewBackgroundColor(properties.color),
      });
    }
    this.setState(properties, () => {
      updateList(
        (response) => {
          callback ? callback(response.data) : null;
          return response.data;
        },
        (error) => {
          console.log(error.response);
        },
        {
          id: this.props.id,
          title: this.state.title,
          color: this.state.color,
          list_items: this.state.listItems,
        }
      );
    });
  };

  getListData = (callback) => {
    getList(
      (response) => {
        this.setState(
          {
            color: response.data.color,
            title: response.data.title,
            listItems: response.data.list_items,
            tags: response.data.tags,
          },
          callback ? callback(response) : null
        );
      },
      (error) => {
        console.log(error.response);
      },
      { id: this.props.id }
    );
  };

  setNewColor = (color) => {
    this.setState({
      color: color,
    });
  };

  renderListHeader = () => {
    return (
      <ListHeader
        updateListTitle={this.updateList}
        hoveringList={this.state.hoveringList}
        title={this.props.title}
        style={this.state.listStyle}
      ></ListHeader>
    );
  };

  renderListBody = () => {
    return (
      <ListBody
        style={this.state.listStyle}
        listItems={this.state.listItems}
        getListData={this.getListData}
        tags={this.state.tags}
        id={this.props.id}
      ></ListBody>
    );
  };

  renderListFooter = () => {
    return (
      <ListFooter
        hoveringList={this.state.hoveringList}
        toggleHoverFooterButton={this.toggleHoverFooterButton}
        isRenderingDropDown={
          this.state.hoveringDropDown || this.state.hoveringFooterButton
        }
        style={this.state.listStyle}
      ></ListFooter>
    );
  };

  toggleHoverDropDown = (bool) => {
    this.setState({
      hoveringDropDown: bool,
    });
  };

  toggleHoverFooterButton = (bool, type = this.state.typeOfDropdown) => {
    this.setState({
      hoveringFooterButton: bool,
      typeOfDropdown: type,
    });
  };

  renderColorDropDown = () => {
    return (
      <ListDropdown
        listStyle={this.state.listStyle}
        color={this.state.color}
        shouldRenderDropDown={
          this.state.hoveringDropDown || this.state.hoveringFooterButton
        }
        typeOfDropdown={this.state.typeOfDropdown}
        toggleHoverDropDown={this.toggleHoverDropDown}
        updateList={this.updateList}
        deleteList={this.deleteList}
      ></ListDropdown>
    );
  };

  toggleHoverList = (bool, callback) => {
    if (bool && !this.state.hoveringList) {
      this.setState(
        {
          hoveringList: bool,
        },
        callback ? callback : null
      );
    } else if (!bool) {
      this.setState({
        hoveringList: bool,
      });
      callback ? callback : null;
    }
  };

  renderList = () => {
    return (
      <div
        style={this.state.listStyle.list}
        onKeyDown={() => {
          this.toggleHoverList(true, () => {
            setTimeout(() => {
              this.toggleHoverList(false);
            }, 1000);
          });
        }}
        onMouseOver={() => {
          this.toggleHoverList(true);
        }}
        onMouseLeave={() => {
          this.toggleHoverList(false);
        }}
      >
        <Card
          style={
            this.state.hoveringList
              ? this.state.listStyle.listCardHover(
                  this.state.hoveringDropDown || this.state.hoveringFooterButton
                )
              : this.state.listStyle.listCard(
                  this.state.hoveringDropDown || this.state.hoveringFooterButton
                )
          }
        >
          {this.renderListHeader()}
          {this.renderListBody()}
          {this.renderListFooter()}
        </Card>
        {this.renderColorDropDown()}
      </div>
    );
  };

  render() {
    return this.renderList();
  }
}

export default List;

List.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  dateCreated: PropTypes.string.isRequired,
  listItems: PropTypes.array.isRequired,
  color: PropTypes.string,
  refresh: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};
