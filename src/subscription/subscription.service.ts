import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';

@Injectable()
export class SubscriptionService {
  constructor(private prismaService: PrismaService) {}

  async genresByUser(user_id: string) {
    const subs = await this.prismaService.subscription.findMany({
      where: { user_id },
      select: { plan: true, user: true },
    });

    const plans_ids = subs.map(({ plan }) => plan.id);

    const genres = await this.prismaService.planGenre.findMany({
      where: { plan_id: { in: plans_ids } },
    });
    const genres_ids = genres
      .map(({ genre_id }) => genre_id)
      .reduce((p, c) => {
        p.add(c);
        return p;
      }, new Set<number>());

    return Array.from(genres_ids.keys());
  }
}
