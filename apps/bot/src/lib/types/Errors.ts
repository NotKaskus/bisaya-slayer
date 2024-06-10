import type { AkiraError } from '#lib/structures/errors/AkiraError';
import type { AkiraCommand } from '#lib/extensions/AkiraCommand';
import type { MessageComponentInteraction, ModalSubmitInteraction } from 'discord.js';
import type { ChannelPermissionsError } from '#lib/structures/errors/ChannelPermissionsError';

export type ErrorPayload = {
	error: AkiraError;
};

export type ChannelPermissionsPayload = {
	error: ChannelPermissionsError;
	interaction:
		| AkiraCommand.ChatInputCommandInteraction //
		| AkiraCommand.ContextMenuCommandInteraction
		| MessageComponentInteraction
		| ModalSubmitInteraction;
};