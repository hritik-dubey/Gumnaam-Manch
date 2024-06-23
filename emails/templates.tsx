import * as React from 'react';
import {Html,Preview, Heading, Section, Row, Head} from "@react-email/components";

export interface verificationEmailProps{
    username: string;
    OTP: string;
}
export default function verificationEmail({username, OTP}:verificationEmailProps) {
    return (
        <Html lang="en">
            <Head>
                <title>
                    verification code from sach bol
                </title>
            </Head>
            <Preview>
                your verification code :{OTP}
            </Preview>
            <Section>
                <Row>
                    <Heading as="h2"> hello {username}</Heading>
                </Row>
                <Row>
                    <Text>
                        Thanks for registering.
                        please use the following credentials to complete your registration
                    </Text>
                </Row>
            </Section>
        </Html>
    );
}

