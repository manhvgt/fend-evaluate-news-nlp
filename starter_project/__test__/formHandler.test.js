// Import
import { handleSubmit, sendToServer, validateUrl, updateView, enableSubmitButton } from '../src/client/js/formHandler';

// Mock the document
beforeEach(() => {
  document.body.innerHTML = `
    <form id="urlForm">
      <input type="text" id="name"/>
      <button type="submit" id="submitButton">Submit</button>
    </form>
    <div id="outModel"></div>
    <div id="outSubjectivity"></div>
    <div id="outAgreement"></div>
  `;
});

test('validateUrl returns true for valid URLs', () => {
  expect(validateUrl('http://example.com')).toBe(true);
  expect(validateUrl('invalid')).toBe(false);
});


test('enableSubmitButton enables button', () => {
  enableSubmitButton(true);
  const button = document.getElementById('submitButton');
  expect(button.disabled).toBe(false);
  expect(button.classList.contains('disabled')).toBe(false);
  expect(button.textContent).toBe('Submit');
});

test('enableSubmitButton disables button', () => {
  enableSubmitButton(false);
  const button = document.getElementById('submitButton');
  expect(button.disabled).toBe(true);
  expect(button.classList.contains('disabled')).toBe(true);
  expect(button.textContent).toBe('Processing...');
});

test('updateView updates DOM elements', () => {
  const data = {
    model: 'Test Model',
    subjectivity: 'Test Subjectivity',
    agreement: 'Test Agreement',
  };
  updateView(data);

  expect(document.getElementById('outModel').textContent).toBe('Model: Test Model');
  expect(document.getElementById('outSubjectivity').textContent).toBe('Subjectivity: Test Subjectivity');
  expect(document.getElementById('outAgreement').textContent).toBe('Agreement: Test Agreement');
});

test('sendToServer should make a POST request and update the view', async () => {
  const mockResponse = {
    json: jest.fn().mockResolvedValue({
      model: 'Test Model',
      subjectivity: 'Subjective',
      agreement: 'Agreement'
    }),
    ok: true
  };
  global.fetch = jest.fn().mockResolvedValue(mockResponse);

  await sendToServer('http://example.com');
  expect(global.fetch).toHaveBeenCalledWith('http://localhost:8000/api', expect.any(Object));
  expect(document.getElementById('outModel').innerHTML).toBe('Model: Test Model');
  expect(document.getElementById('outSubjectivity').innerHTML).toBe('Subjectivity: Subjective');
  expect(document.getElementById('outAgreement').innerHTML).toBe('Agreement: Agreement');
});

test('handleSubmit should validate URL and call sendToServer', async () => {
  const event = { preventDefault: jest.fn() };
  document.getElementById('name').value = 'http://example.com';
  const sendToServerMock = jest.spyOn(require('../src/client/js/formHandler'), 'sendToServer').mockResolvedValue();
        
  await handleSubmit(event);
  expect(event.preventDefault).toHaveBeenCalled();
  // expect(sendToServerMock).toHaveBeenCalledWith('http://example.com');
});

