<template>
<div>

    <h4>Results</h4>

    <p>
        <strong>Status:</strong>
        {{ result.status ?? "N/A" }}
    </p>

    <p>
        <strong>Distance:</strong>
        {{ result.cost ?? "N/A" }}
    </p>

    <p>
        <strong>Path:</strong>
        {{ formattedPath }}
    </p>


    <Divider v-if="hasIterations"/>

    <h4 v-if="hasIterations">
        Iterations
    </h4>


    <DataTable
        v-if="hasIterations"
        :value="result.iterations"
        v-model:expandedRows="expandedRows"
        dataKey="iteration"
        stripedRows
        responsiveLayout="scroll"
    >

        <Column expander style="width:5rem" />

        <Column
            field="iteration"
            header="#"
        />

        <Column
            field="expanded_node"
            header="Expanded Node"
        />

        <Column
            field="g_cost"
            header="g(n)"
        />

        <Column
            field="h_cost"
            header="h(n)"
        />

        <Column
            field="f_cost"
            header="f(n)"
        />

        <Column
            field="frontier_size"
            header="Frontier"
        />


        <template #expansion="slotProps">

            <div class="p-3">

                <h5>
                    Path at iteration {{ slotProps.data.iteration }}
                </h5>

                <DataTable
                    :value="pathToRows(slotProps.data.path)"
                    size="small"
                >

                    <Column
                        field="step"
                        header="Step"
                    />

                    <Column
                        field="city"
                        header="City"
                    />

                </DataTable>

            </div>

        </template>

    </DataTable>

</div>
</template>


<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Divider from 'primevue/divider'

export default {

    components: {
        DataTable,
        Column,
        Divider
    },

    props: {
        result: {
            type: Object,
            default: () => ({})
        }
    },

    data() {
        return {
            expandedRows: []
        }
    },

    computed: {

        hasIterations() {
            return (
                this.result?.iterations &&
                this.result.iterations.length > 0
            )
        },

        formattedPath() {

            if (!this.result?.path?.length) {
                return "N/A"
            }

            return this.result.path.join(" → ")
        }

    },

    methods: {

        pathToRows(path) {

            if (!path) return []

            return path.map((city, index) => ({
                step: index + 1,
                city
            }))
        }

    }

}
</script>
