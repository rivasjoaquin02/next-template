import { fireEvent, render, screen } from '@testing-library/react';

import Root from '@/app/page';
import { login } from '@/lib/actions';
import { loginSchema } from '@/validations/auth';

let formState: {};
const formData = new FormData();

formData.append('username', 'test');
formData.append('password', 'test1234');

const renderComponent = () => {
    return render(<Root />);
};

jest.mock('react-dom', () => ({
    ...jest.requireActual('react-dom'),
    useFormState: (mockLoginAction: any, state: any) => {
        formState = state;
        return [
            formState,
            (formData: FormData) => {
                mockLoginAction(formData).then((newState: any) => {
                    formState = newState;
                });
            },
        ];
    },
}));

jest.mock('../lib/actions', () => ({
    ...jest.requireActual('../lib/actions'),
    login: jest.fn((formData: FormData) => {
        const email = formData.get('email');
        const password = formData.get('password');

        const validatedFields = loginSchema.safeParse({
            email: email,
            password: password,
        });

        if (!validatedFields.success) {
            return Promise.resolve({
                message: 'validation error',
                errors: validatedFields.error.flatten().fieldErrors,
            });
        }

        return Promise.resolve({
            message: 'success',
            errors: {},
        });
    }),
}));

describe('Root', () => {
    it('should render root page', () => {
        renderComponent();
    });

    it('should grab the form components', () => {
        renderComponent();

        const usernameInput = screen.getByPlaceholderText('username');
        const passwordInput = screen.getByPlaceholderText('password');
        const button = screen.getByRole('button');

        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    it('should call login action on form submit', async () => {
        renderComponent();

        const usernameInput = screen.getByPlaceholderText('username');
        const passwordInput = screen.getByPlaceholderText('password');
        const button = screen.getByRole('button');

        fireEvent.input(usernameInput, { target: { value: 'test' }, });
        expect(usernameInput).toHaveValue('test');

        fireEvent.click(button);
        expect(login).not.toHaveBeenCalled();

        fireEvent.input(passwordInput, { target: { value: 'test1234' } });
        expect(passwordInput).toHaveValue('test1234');

        fireEvent.click(button);

        expect(login).toHaveBeenCalled();
    });
});
