import { z } from "zod";

const EmailSchema = z.string().email("the field 'email' is invalid");

export default EmailSchema;