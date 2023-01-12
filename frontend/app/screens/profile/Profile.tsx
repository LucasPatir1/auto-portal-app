import { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Heading from "@/shared/ui/heading/Heading";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserService } from "@/services/user/user.service";
import { SubmitHandler, useForm } from "react-hook-form";
import { IProfileInput } from "./profile.interface";
import { toastError } from "@/utils/toast-error";
import AccountDataFields from "../auth/AccountDataFields";
import { IAuth } from "../auth/auth.interface";
import { toastr } from "react-redux-toastr";


const Profile: FC = () => {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState(null);
	const type = 'profile';
	const { handleSubmit, register, formState, getValues, setValue } =
		useForm<IProfileInput>({
			mode: 'onChange',
		});

	const { isLoading } = useQuery(['profile'], () => UserService.getProfile(), {
		onSuccess({ data }) {
			setValue('email', data.email);
			setValue('firstName', data.firstName);
			setValue('lastName', data.lastName);
		},
		onError(error) {
			toastError(error, 'Get profile');
		},
	});


	const { mutateAsync: editProfile } = useMutation(
		['update profile'],
		(data: IProfileInput) => UserService.updateProfile(data),
		{
			onSuccess() {
				toastr.success('Update profile', 'update was successful');
			},
			onError(error) {
				toastError(error, 'Update profile');
			},
		}
	);

	const onSubmit: SubmitHandler<IProfileInput> = async (data) => {
		await editProfile(data)
	};

	return (
		<Grid container display="inline-flex" justifyContent="space-around" paddingTop='5%'>
			<Grid item lg={3} md={3} sm={6} mr={2}>
				<Card>
					<CardContent>
						<Heading title='Профиль' />
						<Box display="flex" flexDirection="column">
							<form onSubmit={handleSubmit(onSubmit)}>
								<AccountDataFields
									type={type}
									formState={formState}
									register={register}
									isPasswordRequired
								/>
								<Box display="flex" flexDirection="column">
									<Button
										variant="outlined"
										color="inherit"
										sx={{ my: 1 }}
										onClick={() => setOpen(true)}
									>
										Изменить пароль
									</Button>
									<Button
										type='submit'
										variant="outlined"
										color="inherit"
										sx={{ my: 1 }}
									>
										Обновить
									</Button>
								</Box>
							</form>
						</Box>
					</CardContent>
				</Card>
				{/* */}
			</Grid>
		</Grid>
	);
};

export default Profile;



/*
* <FormControl>
									<TextField
										id="outlined-basic"
										sx={{ my: 1 }}
										type="name"
										placeholder="Введите имя"
										label="Имя"
									/>
								</FormControl>
								<FormControl>
									<TextField
										id="outlined-basic"
										sx={{ my: 1 }}
										type="name"
										placeholder="Введите фамилию"
										label="Фамилия"
									/>
								</FormControl>
								<FormControl>
									<TextField
										id="outlined-basic"
										type="email"
										sx={{ my: 1 }}
										placeholder="Введите email"
										label="Email"

									/>
								</FormControl>
								<Box display="flex" flexDirection="column">
									<Button
										variant="outlined"
										color="inherit"
										sx={{ my: 1 }}
										onClick={() => setOpen(true)}
									>
										Изменить пароль
									</Button>
									<Button
										variant="outlined"
										color="inherit"
										sx={{ my: 1 }}
									>
										Обновить
									</Button>
								</Box>
*
*  */