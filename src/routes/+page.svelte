<script lang="ts">
    import { fetchStore, storeDetails } from "../services/index";
    import {
        fetchProducts,
        fetchProductsV2,
        products,
    } from "../services/products";
    import { updateProduct } from "../services/update";
    import { getLocalTimeZone, today } from "@internationalized/date";
    import { RangeCalendar } from "$lib/components/ui/range-calendar/index.js";
    import moment from "moment";
    import { Label } from "$lib/components/ui/label";
    import { Skeleton } from "$lib/components/ui/skeleton";
    import * as Table from "$lib/components/ui/table/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { onMount } from "svelte";

    import * as Popover from "$lib/components/ui/popover";
    import { Badge } from "$lib/components/ui/badge";
    import { Toaster, toast } from "svelte-sonner";
    const start = today(getLocalTimeZone());
    const end = start.add({ days: 7 });
    let dateRanges = [];
    let value = {
        start,
        end,
    };
    let isLoading = false;
    console.log("value", value);
    let formattedDate = moment().format("MMMM Do YYYY, h:mm:ss a");
    let localproduct = [];
    onMount(() => {
        fetchProductsV2("Product", "2024-01-02");
        storeDetails.subscribe((item) => {
            if (item != null) {
                storeLocalDetails = item;
                // isStoreReady = true;
                // items = item.productCategories;
            }
        });
    });

    products.subscribe((item) => {
        console.log(item);
        localproduct = item;
    });
    function resetConfig(item) {
        item.specialDates = [];
        item.specialDatesQuery = "normal";
        item.displayType = "Regular";
        let products = "Product";
        updateProduct(item, products).then((item) => {
            toast.success("Item has been updated ");
            isLoading = false;
        });
    }
    const setExclusive = (item) => {
        getRangeDates().then((dates) => {
            item.specialDates = dates;
            item.displayType = "Exclusive";
            item.specialDatesQuery = "displayOnly";
            isLoading = true;
            let products = "Product";
            console.log(dates);
            updateProduct(item, products).then((item) => {
                toast.success("Item has been updated ");
                isLoading = false;
            });
        });
        // setTimeout(() => {

        // }, 1000); // Delay of 1000 milliseconds (1 second));
    };
    async function getRangeDates() {
        const startDate = moment(
            `${value.start.year}-${value.start.month}-${value.start.day}`,
        );
        const endDate = moment(
            `${value.end.year}-${value.end.month}-${value.end.day}`,
        );

        const startMoment = startDate;
        const endMoment = endDate;
        if (!startMoment.isValid() || !endMoment.isValid()) {
            console.error("Invalid start or end date");
            return [];
        }

        const daysDifference = endMoment.diff(startMoment, "days");

        return Array.from({ length: daysDifference + 1 }, (_, index) =>
            startMoment.clone().add(index, "days").format("YYYY-MM-DD"),
        );
    }
    function setOccassionalyProduct(item) {
        // selectedProduct = item;
        // isCurrentLoading = true;
        let products = "Product";
        item.specialDates = [];
        item.displayType = "Occasion";
        item.specialDatesQuery = "displayOnly";
        console.log("item", item);
        updateProduct(item, products).then((item) => {
            isCurrentLoading = false;
            toast.success("Item has been hidden for Feb[2-7]");
        });
    }
    const getBadgeType = (type) => {
        switch (type) {
            case "Occasion":
                return "outline"; // Example return value for "Occasion"
            case "Regular":
                return "default"; // Example return value for "Urgent"
            case "Exclusive":
                return "destructive"; // Example return value for "Important"
            default:
                return ""; // Default case returns an empty string
        }
    };
</script>

<div class="m-20">
    <!-- <div class="lg:w-1/4 w-72">
        <RangeCalendar bind:value class="rounded-md  w-full" />
    </div> -->
    <div>
        <Label for="email" class="text-lg font-bold mb-20">CONFIGURATION</Label>
    </div>

    <div class="mt-20">
        <Label for="email">{moment(value.start).to(value.end)}</Label>
    </div>
    <div
        class={`flex items-center space-x-4 ${localproduct.length != 0 ? "hidden" : ""}`}
    >
        <Skeleton class="h-12 w-12 rounded-full" />
        <div class="space-y-2">
            <Skeleton class="h-4 w-[250px]" />
            <Skeleton class="h-4 w-[200px]" />
        </div>
    </div>

    <Table.Root>
        <Table.Caption>A list of your recent invoices.</Table.Caption>
        <Table.Header>
            <Table.Row>
                <Table.Head class="w-[100px]">Invoice</Table.Head>
                <Table.Head>Status</Table.Head>
                <Table.Head>Method</Table.Head>
                <Table.Head class="text-right">Amount</Table.Head>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {#each localproduct as product, i (i)}
                <Table.Row>
                    <Table.Cell class="font-light"
                        ><img
                            class="hover:shadow-lg rounded-md"
                            src={product.imgUrl}
                            height="100"
                            width="100"
                        /></Table.Cell
                    >

                    <Table.Cell class="text-xs">{product.title}</Table.Cell>
                    <Table.Cell class="text-xs">
                        <Badge variant={getBadgeType(product.displayType)}
                            >{product.displayType}</Badge
                        >
                        <!-- <Badge variant="outline"
                            >{product.specialDatesQuery}</Badge
                        > -->
                    </Table.Cell>
                    <Table.Cell class="text-right text-xs">
                        <!-- {product.price} -->
                        <div class="gap-4 col">
                            <Button
                                variant="outline"
                                class="text-xs"
                                on:click={() => setRegularProduct(product)}
                                >Hide
                            </Button>

                            <Popover.Root>
                                <Popover.Trigger>
                                    <Button
                                        variant="destructive"
                                        class="text-xs">Set Exclusive</Button
                                    ></Popover.Trigger
                                >
                                <Popover.Content>
                                    <div class="w-full">
                                        <RangeCalendar
                                            bind:value
                                            class="rounded-md  w-full"
                                        />
                                    </div>
                                    <div>
                                        <Label for="email"
                                            >Start date: {value.start}</Label
                                        >
                                    </div>

                                    <div>
                                        <Label for="email"
                                            >End date: {value.end}</Label
                                        >
                                    </div>
                                    <Button
                                        variant="default"
                                        class="text-xs w-full"
                                        on:click={() => setExclusive(product)}
                                        >Save configuration
                                    </Button>
                                </Popover.Content>
                            </Popover.Root>
                            <Button
                                class="text-xs"
                                on:click={() => resetConfig(product)}
                                >Reset</Button
                            >
                        </div>
                    </Table.Cell>
                </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>
    <div class="col-end-1">
        {#each dateRanges as dates, i (i)}
            <Label for="email">{dates}</Label>
        {/each}
    </div>
    <!-- <div
        class="bottom-16 left-0 fixed w-full justify-center align-middle items-center flex gap-4"
    >
        <Button class="text-xs" on:click={() => getRangeDates()}
            >Save Configuration</Button
        >
    </div> -->
</div>

<Toaster />
