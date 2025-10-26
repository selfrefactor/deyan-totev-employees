interface AuctionItem {
	id: number;title: string;
description: string;
category: string;
estimatedValue: number;
imageUrl: string;
auctionHouse: string;
endDate: string;
status: 'upcoming' | 'live' | 'ended' ;
}