import React from 'react';

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Item,
  Label,
  Input,
  Body,
  Left,
  Right,
  Form,
  Text
} from "native-base";

import Icon from 'react-native-vector-icons/FontAwesome';

export const renderInputField = ({
  input,
  borderType,
  placeholder,
  id,
  meta: { touched, error },
  ...custom
}) =>

        <Input
          placeholder={placeholder}
          id={id}
          borderType={borderType}
          {...input}
          {...custom}
        />
