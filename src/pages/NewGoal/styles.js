import styled from 'styled-components/native';

export const Background = styled.SafeAreaView`
  flex: 1;
  background-color: #f0f4ff;
  padding: 20px;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  background-color: #fff;
  border-radius: 8px;
  padding: 0 15px;
  margin-bottom: 15px;
  font-size: 16px;
  color: #121212;
  border: 1px solid #ddd;
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: #3b3dbf;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

export const SubmitText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;