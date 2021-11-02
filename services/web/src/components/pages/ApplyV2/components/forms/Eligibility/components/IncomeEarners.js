import { useState, useEffect } from 'react';

import {
  Form,
  Input,
  Card,
  Typography,
  Divider,
  Button,
  InputNumber,
} from 'antd';

const { Text } = Typography;

const Index = ({
  formValues,
  handleChange,
  setEligibilityContent,
  onStateChange,
  handleCheckBoxChange,
}) => {
  const [page, setPage] = useState('totalEarners');

  let props = {
    formValues,
    handleChange,
    setEligibilityContent,
    onStateChange,
    handleCheckBoxChange,
    page,
    setPage,
  };

  return <RenderContent page={page} props={props} />;
};

const TotalEarners = ({ setPage, handleChange, formValues }) => {
  return (
    <Form
      layout="vertical"
      onChange={handleChange}
      onFinish={() => setPage('setIncomes')}
    >
      <Card headStyle={{ background: ' #472D5B' }}>
        <p>
          Welcome to Family Promise of Spokane's Housing Assistance Application.
        </p>
        <br />
        <p>
          Please begin by providing information about your household's earned
          income over the last 60 days
        </p>
        <Text type="secondary">
          This will help us determine your eligibility for assistance. We must
          verify information with your landlord to approve any requests.
          <br></br>
          <br />
        </Text>
        <b>
          Providing false or incorrect information here may greatly increase the
          time and work needed to approve your request.
        </b>
        <Divider />

        <Form.Item
          hasFeedback
          name="incomeEarners"
          initialValue={formValues.incomeEarners}
          label={'How many people are receiving income in your household?'}
          rules={[
            {
              required: true,
              pattern: RegExp(
                // looks for at least 1 digit with optional decimal point
                /\d+(?:\.\d+)?/
              ),
              message: 'Invalid number',
            },
          ]}
        >
          <Input size="large" name="incomeEarners" style={{ width: '100%' }} />
        </Form.Item>

        <Button htmlType="submit">Submit</Button>
      </Card>
    </Form>
  );
};

const SetIncomes = ({ formValues }) => {
  const [incomeValues, setIncomeValues] = useState([]);

  let handleChange = (i, income) => {
    let newFormValues = [...incomeValues];

    newFormValues[i]['income'] = income;
    setIncomeValues(newFormValues);
  };

  useEffect(() => {
    let initialValues = [];

    for (let i = 0; i < formValues.incomeEarners; i++) {
      let name = 'Person ' + (i + 1);

      initialValues.push({ name, income: null });
    }

    setIncomeValues(initialValues);
  }, []);

  useEffect(() => {
    console.log(incomeValues);
  }, [incomeValues]);

  return (
    <Form layout="vertical" onFinish={console.log}>
      <Card headStyle={{ background: ' #472D5B' }}>
        <p>
          Welcome to Family Promise of Spokane's Housing Assistance Application.
        </p>
        <br />
        <p>Please fill in the income for each person inside the household</p>

        {incomeValues.map((element, index) => (
          <Form.Item
            label={`Person ${index + 1}`}
            key={index}
            rules={[{ required: true, message: 'required' }]}
            name={index}
          >
            <InputNumber
              style={{ width: '100%' }}
              name="income"
              addonBefore={'$'}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              formatter={value =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              onChange={e => handleChange(index, e)}
              precision={2}
            />
          </Form.Item>
        ))}
        <Button htmlType="submit">Submit</Button>
      </Card>
    </Form>
  );
};

const RenderContent = ({ page, props }) => {
  switch (page) {
    case 'totalEarners':
      return <TotalEarners {...props} />;
    case 'setIncomes':
      return <SetIncomes {...props} />;
    default:
      return <h1>Mistakes have been made</h1>;
  }
};

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default Index;
