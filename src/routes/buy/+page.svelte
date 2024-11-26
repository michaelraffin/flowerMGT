<script lang="ts">
    import { fetchStore, storeDetails } from "../../services/index";
    import { fetchProducts, products } from "../../services/products";
    import { updateProduct } from "../../services/update";
    import { getLocalTimeZone, today } from "@internationalized/date";

    import { Calendar } from "$lib/components/ui/calendar/index.js";

    import { RangeCalendar } from "$lib/components/ui/range-calendar/index.js";
    import moment from "moment";
    import { Label } from "$lib/components/ui/label";
    import { Skeleton } from "$lib/components/ui/skeleton";
    import * as Table from "$lib/components/ui/table/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { onMount } from "svelte";

    import { Badge } from "$lib/components/ui/badge";
    import { Toaster, toast } from "svelte-sonner";
    const start = today(getLocalTimeZone());
    const end = start.add({ days: 7 });
    let dateRanges = [];
    let value = {
        start,
        end,
    };
    let selectedDate = "";

    console.log("value", value);
    let formattedDate = moment().format("MMMM Do YYYY, h:mm:ss a");
    let localproduct = [];
    onMount(() => {
        console.log("selectedDate", selectedDate);
        fetchProducts("Product", "2025-02-02");
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
        console.log("item XXXXX", item);
        toast.success("Item has been set to regular");
    }

    function getRangeDates() {
        const startDate = moment(value.start);
        const endDate = moment(value.end);

        // Initialize an array to store the dates
        const datesInRange = [];

        // Loop through each day in the range
        let currentDate = startDate.clone();
        while (currentDate.isSameOrBefore(endDate)) {
            datesInRange.push(currentDate.format("YYYY-MM-DD"));
            currentDate.add(1, "day"); // Increment by one day
        }
        console.log("datesInRange", datesInRange);
        dateRanges = datesInRange;
    }
    function setRegularProduct(item) {
        // selectedProduct = item;
        // isCurrentLoading = true;
        let products = "Product";
        item.specialDates = [];
        // [
        // 	'2023-02-07',
        // 	'2023-02-06',
        // 	'2023-02-05',
        // 	'2023-02-04',
        // 	'2023-02-03',
        // 	'2023-02-02',
        // 	'2024-02-07',
        // 	'2024-02-06',
        // 	'2024-02-05',
        // 	'2024-02-04',
        // 	'2024-02-03',
        // 	'2024-02-02'
        // ];
        item.specialDatesQuery = "hideOnly";
        console.log("item", item);
        // updateProduct(item, products).then((item) => {
        //     isCurrentLoading = false;
        //     toast.success("Item has been hidden for Feb[2-7]");
        // });
    }
    const handleDateChange = (dateObject) => {
        console.log(
            "Selected date:",
            `${dateObject.year}-${dateObject.day}-${dateObject.month}`,
        ); // Assuming `event.detail` contains the selected date
        selectedDate = `${dateObject.year}-${dateObject.month}-${dateObject.day}`;
        localproduct = [];
        fetchProducts("Product", selectedDate);
    };
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
    <div class="lg:w-1/4 w-72">
        <!-- <RangeCalendar bind:value class="rounded-md  w-full" /> -->

        <Calendar
            bind:selectedDate
            class="rounded-md border"
            onValueChange={(e) => handleDateChange(e)}
        />
    </div>
    <!--
    <div>
        <Label for="email">Start date selectedDate: {selectedDate}</Label>
    </div> -->

    <div
        class={`flex items-center space-x-4 mt-20 ${localproduct.length != 0 ? "hidden" : ""}`}
    >
        <Skeleton class="h-12 w-12 rounded-full" />
        <div class="space-y-2">
            <Skeleton class="h-4 w-[250px]" />
            <Skeleton class="h-4 w-[200px]" />
        </div>
    </div>

    <Table.Root class=" mt-20">
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
                            alt="xx"
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
                    </Table.Cell>
                    <Table.Cell class="text-right text-xs">
                        {product.price}
                    </Table.Cell>
                </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>c
    <div class="col-end-1">
        {#each dateRanges as dates, i (i)}
            <Label for="email">{dates}</Label>
        {/each}
    </div>
    <div
        class="bottom-16 left-0 fixed w-full justify-center align-middle items-center flex gap-4"
    >
        <Button class="text-xs hidden" on:click={() => getRangeDates()}
            >Save Configuration</Button
        >
    </div>
</div>

<Toaster />
