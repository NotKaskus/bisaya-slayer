import { container } from '@sapphire/framework';
import { Counter, Gauge, register } from 'prom-client';

type AkiraCounters = {
	commands: Counter;
	youtube: Counter;
	// TODO: Add gauge here for total tickets or somthing
};

export class AkiraMetrics {
	private readonly counters: AkiraCounters;

	public constructor() {
		this.setupGauges();

		// TODO: Add gauge here for total tickets or somthing
		this.counters = {
			commands: new Counter({
				name: 'akira_bot_commands_total',
				help: 'Counter for total amount of command uses.',
				registers: [register],
				labelNames: ['command', 'success'] as const
			}),
			youtube: new Counter({
				name: 'akira_bot_youtube_notifications_total',
				help: 'Counter for total amount of youtube notifications.',
				registers: [register],
				labelNames: ['success'] as const
			})
		};
	}

	/**
	 * Increment the command counter.
	 * @param data - The data to increment the counter
	 */
	public incrementCommand(data: { command: string; success: boolean; value?: number }): void {
		const { command, success, value = 1 } = data;

		this.counters.commands.inc({ command, success: String(success) }, value);
	}

	/**
	 * Increment the YouTube notification counter.
	 * @param data - The data to increment the counter
	 */
	public incrementYoutube({ success, value = 1 }: { success: boolean; value?: number }): void {
		this.counters.youtube.inc({ success: String(success) }, value);
	}

	private setupGauges(): void {
		new Gauge({
			name: 'akira_bot_guilds_total',
			help: 'Gauge for total amount of guilds.',
			registers: [register],
			collect(): void {
				if (container.client.isReady()) {
					this.set(container.client.guilds.cache.size);
				}
			}
		});

		new Gauge({
			name: 'akira_bot_users_total',
			help: 'Gauge for total amount of users.',
			registers: [register],
			collect(): void {
				if (container.client.isReady()) {
					this.set(container.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0));
				}
			}
		});

		new Gauge({
			name: 'kbot_bot_holodex_channels_total',
			help: 'Gauge for total amount of youtube channels.',
			registers: [register],
			async collect(): Promise<void> {
				if (container.client.isReady()) {
					this.set(await container.youtube.channels.count());
				}
			}
		});
	}
}