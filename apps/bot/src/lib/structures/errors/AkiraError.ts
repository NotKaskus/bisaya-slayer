import type { AkiraErrorCode } from '#lib/types/Enums';

export type AkiraErrorOptions = {
	name?: string;
	code: AkiraErrorCode;
	userMessage?: string;
};

export class AkiraError extends Error {
	public override readonly name: string;

	public readonly code: AkiraErrorCode;

	public readonly userMessage: string | undefined;

	public constructor(message: string, { name, code, userMessage }: AkiraErrorOptions) {
		super(message);

		this.name = name ?? 'AkiraError';
		this.code = code;
		this.userMessage = userMessage;
	}
}