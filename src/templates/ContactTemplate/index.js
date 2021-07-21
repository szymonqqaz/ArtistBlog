import React from 'react';

import TopBarDesktop from 'components/TopBarDesktop';
import TopBarMobile from 'components/TopBarMobile';
import Footer from 'components/Footer';

import useHooks from './useHooks';

import {
  Desc,
  MainWrapper,
  SectionName,
  Input,
  InputName,
  Textarea,
  SendButton,
  Form,
  TextAlternativeSend,
  TextBold,
} from './styles';

const ContactTemplate = () => {
  const { inputsRef, isSendButtonDisabled, validateForm } = useHooks();

  return (
    <>
      <TopBarDesktop />
      <TopBarMobile />
      <MainWrapper>
        <SectionName>Kontakt</SectionName>
        <Desc>jeśli masz jakąś sprawę do mnie to zapraszam do kontaktu</Desc>
        <Form action={process.env.GATSBY_FORM_API_KEY} method="POST">
          <InputName>Twój mail</InputName>
          <Input
            type="email"
            placeholder="jan.kowalski@gmail.com"
            ref={inputsRef.emailInputRef}
            onChange={validateForm}
            name="_replyto"
          />
          <InputName>Temat</InputName>
          <Input
            type="text"
            ref={inputsRef.topicInputRef}
            onChange={validateForm}
            name="Temat"
          />
          <InputName>Treść</InputName>
          <Textarea
            rows="6"
            ref={inputsRef.contentInputRef}
            onChange={validateForm}
            name="Treść"
          />
          <SendButton disabled={isSendButtonDisabled}>wyślij</SendButton>
        </Form>
        <TextAlternativeSend>
          Jeśłi nie możesz skożystać z formulaża to zapraszam do kontaktu na
          email <br /> <TextBold>brudplast@gmail.com</TextBold>
        </TextAlternativeSend>
      </MainWrapper>
      <Footer />
    </>
  );
};

export default ContactTemplate;
