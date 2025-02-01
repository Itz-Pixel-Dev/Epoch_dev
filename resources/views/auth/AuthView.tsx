import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { useHistory } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';
import { ApplicationStore } from '@/state';
import login from '@/api/auth/login';

export const AuthView = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);
	const history = useHistory();
	const setUserData = useStoreActions((actions: ApplicationStore) => actions.user.setUserData);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		try {
			const response = await login('username', 'password');
			setUserData(response.user);
			history.push('/');
		} catch (err) {
			setError('Invalid credentials. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-background p-4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="w-full max-w-md"
			>
				<Card padding="lg" className="w-full">
					<div className="text-center mb-8">
						<h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
						<p className="mt-2 text-foreground/60">
							Sign in to your account to continue
						</p>
					</div>

					{error && (
						<Alert variant="error" show={true} className="mb-6">
							{error}
						</Alert>
					)}

					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<Input
								label="Username"
								type="text"
								placeholder="Enter your username"
								required
							/>
						</div>
						<div>
							<Input
								label="Password"
								type="password"
								placeholder="Enter your password"
								required
							/>
						</div>
						<div className="flex items-center justify-between">
							<label className="flex items-center">
								<input type="checkbox" className="rounded border-border" />
								<span className="ml-2 text-sm text-foreground/60">Remember me</span>
							</label>
							<a href="/forgot-password" className="text-sm text-primary hover:underline">
								Forgot password?
							</a>
						</div>
						<Button
							type="submit"
							variant="primary"
							className="w-full"
							isLoading={isLoading}
						>
							Sign In
						</Button>
					</form>
				</Card>
			</motion.div>
		</div>
	);
};