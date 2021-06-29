import { Input, Form, Button } from 'antd';
const { TextArea } = Input;

const RenderSelfDecDocument = ({
  sessionId,
  handleTextSubmit,
  handleModalCloseButton,
  selectedCategory,
}) => {
  const docUrl = `https://app.pandadoc.com/s/${sessionId}`;

  const onFinish = values => {
    handleTextSubmit(values.text);
  };

  const UserTextInput = () => {
    return (
      <div>
        <Form layout="vertical" name="selfDecUserInput" onFinish={onFinish}>
          <Form.Item
            name="text"
            label="Briefly explain why you cannot provide a document:"
            initialValue={''}
            rules={[
              {
                required: true,
                message: 'Please explain why you cannot provide a document!',
              },
              {
                min: 20,
                message: 'Explanation must be at least 20 characters!',
              },
            ]}
          >
            <TextArea key="fix" rows={5} allowClear />
          </Form.Item>
          {sessionId ? null : (
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {selectedCategory === 'childrenOrPregnancy'
                  ? 'Submit'
                  : 'Create Document'}
              </Button>
            </Form.Item>
          )}
        </Form>
      </div>
    );
  };

  return (
    <div>
      {/* sessionId is generated from handle doc creation  */}
      {sessionId ? (
        <div className="documentContainer">
          <iframe
            title="Self Dec Embed"
            src={docUrl}
            style={{ height: '70vh', width: '75vw' }}
          ></iframe>
        </div>
      ) : (
        <UserTextInput />
      )}
    </div>
  );
};

export default RenderSelfDecDocument;
