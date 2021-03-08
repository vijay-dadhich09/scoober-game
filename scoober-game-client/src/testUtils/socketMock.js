const socketMock = {
  on: (event, cb) => cb(),
  emit: jest.fn(),
};

export default socketMock;
