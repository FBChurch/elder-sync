import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  FileOutlined,
  UserOutlined,
  HomeOutlined,
  TeamOutlined,
  FolderOpenOutlined,
  SendOutlined,
  UserAddOutlined,
} from '@ant-design/icons';

import { Typography, Layout, Menu } from 'antd';

import {
  Address,
  CreateAccount,
  Demographics,
  Documents,
  Household,
  Landlord,
  Review,
  Submit,
  Status,
  Eligibility,
} from './forms';

import { INITIAL_VALUES } from '../utils/initialFormValues';
import { setRequestAddressAndDocuments } from '../../../../redux/requests/requestActions';
import checkIfAllDocumentsAreSubmitted from '../../Home/components/DefaultHomePage/Documents/utils/checkIfAllDocumentsAreSubmitted';
import { CheckSquareOutlined } from '@ant-design/icons';
import useWindowDimensions from '../../../../utils/useWindowDimensions';
import { whileStatement } from '@babel/types';
import ProgressBar from './ProgressBar';

const { Content, Sider } = Layout;

export default function Index() {
  const { width } = useWindowDimensions();

  const dispatch = useDispatch();

  //UI State
  const currentUser = useSelector(state => state.user.currentUser);
  const [formValues, setFormValues] = useState(INITIAL_VALUES());
  const [errorMessage, setErrorMessage] = useState(null);
  const [collapsed, setCollapsed] = useState(width <= 800);
  const [allDocumentsSubmitted, setAllDocumentsSubmitted] = useState(false);

  const [currentContent, setCurrentContent] = useState(
    currentUser.applicationStep ? currentUser.applicationStep : 'createAccount'
  );

  const request = useSelector(state => state.requests.request);

  const documents = useSelector(state => state.requests.documents);

  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  const addressDetails = useSelector(state => state.requests.addressDetails);

  //Event Handlers
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const onContentChange = ({ key }) => {
    setCurrentContent(key);

    if (key !== 'userInfo' && collapsed) {
      setCollapsed(false);
    }
  };

  const handleChange = e => {
    // Clean up any error message after the user types
    if (errorMessage) {
      setErrorMessage(null);
    }

    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  function onStateChange(value) {
    setFormValues({ ...formValues, state: value });
  }

  function onLandlordStateChange(value) {
    setFormValues({ ...formValues, landlordState: value });
  }

  function onDateChange(value) {
    setFormValues({ ...formValues, dob: value });
  }

  function onGenderChange(value) {
    setFormValues({ ...formValues, gender: value });
  }

  const onRoleChange = value => {
    setFormValues({ ...formValues, role: value });
  };

  const handleCheckBoxChange = e => {
    e.stopPropagation();

    const { name, checked } = e.target;

    setFormValues({ ...formValues, [name]: checked });
  };

  const props = {
    currentContent,
    setCurrentContent,
    formValues,
    setFormValues,
    errorMessage,
    setErrorMessage,
    handleChange,
    onStateChange,
    onDateChange,
    onGenderChange,
    onRoleChange,
    handleCheckBoxChange,
    request,
    currentUser,
    dispatch,
    allDocumentsSubmitted,
    onLandlordStateChange,
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(setRequestAddressAndDocuments());
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setAllDocumentsSubmitted(checkIfAllDocumentsAreSubmitted(documents));
  }, [documents]);

  useEffect(() => {
    if (request['zipCode'] || request['landlordZip']) {
      request['zipCode'] = String(request['zipCode']);
      request['landlordZip'] = String(request['landlordZip']);
    }

    setFormValues({
      ...formValues,
      ...request,
      ...addressDetails,
    });
  }, [request]);

  function currentContentToProgress(currentContent) {
    switch (currentContent) {
      case 'eligibility':
        return 0;
      case 'createAccount':
        return 10;
      case 'landlord':
        return 20;
      case 'address':
        return 30;
      case 'household':
        return 40;
      case 'demographics':
        return 50;
      case 'documents':
        return 60;
      case 'review':
        return 70;
      case 'submit':
        return 80;
      case 'status':
        return 90;
      default:
        return 0;
    }
  }

  return (
    <div className="homeContainer">
      <ProgressBar progress={currentContentToProgress(currentContent)} />

      <Layout style={{ height: '100%' }}>
        <Sider
          collapsible
          onCollapse={toggleCollapse}
          collapsedWidth={60}
          width="15rem"
          style={{ backgroundColor: 'white' }}
          collapsed={collapsed}
        >
          <Menu
            defaultSelectedKeys={['createAccount']}
            selectedKeys={[currentContent]}
          >
            <Menu.Item
              key="eligibility"
              disabled={isLoggedIn || currentContent === 'verifyAddress'}
              icon={<CheckSquareOutlined />}
              onClick={e => {
                setCollapsed(true);
                onContentChange(e);
              }}
            >
              Check your eligibility
            </Menu.Item>
            <Menu.Item
              key="createAccount"
              icon={<UserOutlined />}
              disabled={
                isLoggedIn ||
                currentContent in { eligibility: 1, verifyAddress: 1 }
              }
              onClick={e => {
                setCollapsed(true);
                onContentChange(e);
              }}
            >
              Create your Account
            </Menu.Item>
            <Menu.Item
              key="landlord"
              icon={<UserAddOutlined />}
              onClick={onContentChange}
              disabled={!isLoggedIn}
            >
              Landlord / Property Manager
            </Menu.Item>

            <Menu.Item
              key="household"
              onClick={onContentChange}
              icon={<HomeOutlined />}
              disabled={
                currentUser.applicationStep in { landlord: 1, address: 1 } ||
                !isLoggedIn
              }
            >
              Your Household info.
            </Menu.Item>
            <Menu.Item
              key="demographics"
              onClick={onContentChange}
              icon={<TeamOutlined />}
              disabled={
                currentUser.applicationStep in
                  { landlord: 1, address: 1, household: 1 } || !isLoggedIn
              }
            >
              Demographic info.
            </Menu.Item>
            <Menu.Item
              key="documents"
              onClick={onContentChange}
              icon={<FileOutlined />}
              disabled={
                currentUser.applicationStep in
                  { landlord: 1, address: 1, household: 1, demographics: 1 } ||
                !isLoggedIn
              }
            >
              Document Center
            </Menu.Item>
            <Menu.Item
              key="review"
              icon={<FolderOpenOutlined />}
              onClick={onContentChange}
              disabled={!isLoggedIn || !allDocumentsSubmitted}
            >
              Review your Application
            </Menu.Item>
            <Menu.Item
              key="submit"
              onClick={onContentChange}
              icon={<SendOutlined />}
              disabled={
                !isLoggedIn ||
                !allDocumentsSubmitted ||
                currentUser.applicationStep in
                  { landlord: 1, address: 1, household: 1, demographics: 1 }
              }
            >
              Submit
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout className="sidebar-content-container">
          <Content
            className="homeContent"
            style={{
              minHeight: 280,
            }}
          >
            {renderContent(props)}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

const renderContent = props => {
  switch (props.currentContent) {
    case 'eligibility':
      return <Eligibility {...props} />;
    case 'createAccount':
      return <CreateAccount {...props} />;
    case 'landlord':
      return <Landlord {...props} />;
    case 'address':
      return <Address {...props} />;
    case 'household':
      return <Household {...props} />;
    case 'demographics':
      return <Demographics {...props} />;
    case 'documents':
      return <Documents {...props} />;
    case 'review':
      return <Review {...props} />;
    case 'submit':
      return <Submit {...props} />;
    case 'status':
      return <Status {...props} />;
    default:
      return <h1>Default</h1>;
  }
};
