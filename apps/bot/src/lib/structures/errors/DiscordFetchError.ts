import { AkiraError } from '#lib/structures/errors/AkiraError';
import { AkiraErrorCodes } from '#lib/types/Enums';

export type DiscordFetchErrorErrorOptions = {
	message?: string;
	userMessage?: string;
	resourceId: string;
};

export class DiscordFetchError extends AkiraError {
	public override readonly userMessage: string;

	public readonly resourceId: string;

	public constructor(options: DiscordFetchErrorErrorOptions) {
		super(options.message ?? `Failed to fetch a Discord resource`, {
			name: 'DiscordFetchError',
			code: AkiraErrorCodes.DiscordFetch
		});

		this.userMessage = options.userMessage ?? 'Something went wrong.';
		this.resourceId = options.resourceId;
	}
}