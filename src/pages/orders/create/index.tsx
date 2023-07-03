import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createOrder } from 'apiSdk/orders';
import { Error } from 'components/error';
import { orderValidationSchema } from 'validationSchema/orders';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { CompanyInterface } from 'interfaces/company';
import { getCompanies } from 'apiSdk/companies';
import { OrderInterface } from 'interfaces/order';

function OrderCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: OrderInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createOrder(values);
      resetForm();
      router.push('/orders');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<OrderInterface>({
    initialValues: {
      customer_name: '',
      product_category: '',
      size: 0,
      length: 0,
      weight: 0,
      purity: 0,
      screw_type: '',
      rhodium_details: '',
      delivery_date: new Date(new Date().toDateString()),
      company_id: (router.query.company_id as string) ?? null,
    },
    validationSchema: orderValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Order
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="customer_name" mb="4" isInvalid={!!formik.errors?.customer_name}>
            <FormLabel>Customer Name</FormLabel>
            <Input
              type="text"
              name="customer_name"
              value={formik.values?.customer_name}
              onChange={formik.handleChange}
            />
            {formik.errors.customer_name && <FormErrorMessage>{formik.errors?.customer_name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="product_category" mb="4" isInvalid={!!formik.errors?.product_category}>
            <FormLabel>Product Category</FormLabel>
            <Input
              type="text"
              name="product_category"
              value={formik.values?.product_category}
              onChange={formik.handleChange}
            />
            {formik.errors.product_category && <FormErrorMessage>{formik.errors?.product_category}</FormErrorMessage>}
          </FormControl>
          <FormControl id="size" mb="4" isInvalid={!!formik.errors?.size}>
            <FormLabel>Size</FormLabel>
            <NumberInput
              name="size"
              value={formik.values?.size}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('size', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.size && <FormErrorMessage>{formik.errors?.size}</FormErrorMessage>}
          </FormControl>
          <FormControl id="length" mb="4" isInvalid={!!formik.errors?.length}>
            <FormLabel>Length</FormLabel>
            <NumberInput
              name="length"
              value={formik.values?.length}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('length', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.length && <FormErrorMessage>{formik.errors?.length}</FormErrorMessage>}
          </FormControl>
          <FormControl id="weight" mb="4" isInvalid={!!formik.errors?.weight}>
            <FormLabel>Weight</FormLabel>
            <NumberInput
              name="weight"
              value={formik.values?.weight}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('weight', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.weight && <FormErrorMessage>{formik.errors?.weight}</FormErrorMessage>}
          </FormControl>
          <FormControl id="purity" mb="4" isInvalid={!!formik.errors?.purity}>
            <FormLabel>Purity</FormLabel>
            <NumberInput
              name="purity"
              value={formik.values?.purity}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('purity', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.purity && <FormErrorMessage>{formik.errors?.purity}</FormErrorMessage>}
          </FormControl>
          <FormControl id="screw_type" mb="4" isInvalid={!!formik.errors?.screw_type}>
            <FormLabel>Screw Type</FormLabel>
            <Input type="text" name="screw_type" value={formik.values?.screw_type} onChange={formik.handleChange} />
            {formik.errors.screw_type && <FormErrorMessage>{formik.errors?.screw_type}</FormErrorMessage>}
          </FormControl>
          <FormControl id="rhodium_details" mb="4" isInvalid={!!formik.errors?.rhodium_details}>
            <FormLabel>Rhodium Details</FormLabel>
            <Input
              type="text"
              name="rhodium_details"
              value={formik.values?.rhodium_details}
              onChange={formik.handleChange}
            />
            {formik.errors.rhodium_details && <FormErrorMessage>{formik.errors?.rhodium_details}</FormErrorMessage>}
          </FormControl>
          <FormControl id="delivery_date" mb="4">
            <FormLabel>Delivery Date</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.delivery_date ? new Date(formik.values?.delivery_date) : null}
                onChange={(value: Date) => formik.setFieldValue('delivery_date', value)}
              />
              <Box zIndex={2}>
                <FiEdit3 />
              </Box>
            </Box>
          </FormControl>
          <AsyncSelect<CompanyInterface>
            formik={formik}
            name={'company_id'}
            label={'Select Company'}
            placeholder={'Select Company'}
            fetcher={getCompanies}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'order',
    operation: AccessOperationEnum.CREATE,
  }),
)(OrderCreatePage);
